import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  const where = projectId ? { projectId: parseInt(projectId) } : {};

  const responses = await prisma.surveyResponse.findMany({
    where,
    include: { project: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  });

  if (responses.length === 0) {
    return new NextResponse("No responses to export", { status: 404 });
  }

  // Build CSV
  const allAnswerKeys = new Set<string>();
  for (const r of responses) {
    const answers = r.answers as Record<string, unknown>;
    Object.keys(answers).forEach((k) => allAnswerKeys.add(k));
  }

  const headers = [
    "ID",
    "Project",
    "Respondent Name",
    "Respondent Email",
    "Date",
    ...Array.from(allAnswerKeys),
  ];

  const escape = (val: unknown) => {
    const str = String(val ?? "");
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = responses.map((r) => {
    const answers = r.answers as Record<string, unknown>;
    return [
      r.id,
      r.project.title,
      r.respondentName || "",
      r.respondentEmail || "",
      new Date(r.createdAt).toISOString(),
      ...Array.from(allAnswerKeys).map((k) => answers[k] ?? ""),
    ]
      .map(escape)
      .join(",");
  });

  const csv = [headers.map(escape).join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="survey-responses-${Date.now()}.csv"`,
    },
  });
}
