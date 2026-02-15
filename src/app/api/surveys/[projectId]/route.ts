import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projectId = parseInt(params.projectId);
  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const responses = await prisma.surveyResponse.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(responses);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } },
) {
  const projectId = parseInt(params.projectId);
  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  // Verify project exists and has surveys enabled
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (!project.surveyEnabled) {
    return NextResponse.json(
      { error: "Surveys not enabled for this project" },
      { status: 403 },
    );
  }

  const body = await request.json();

  const response = await prisma.surveyResponse.create({
    data: {
      projectId,
      respondentName: body.respondentName || null,
      respondentEmail: body.respondentEmail || null,
      answers: body.answers,
    },
  });

  return NextResponse.json(response, { status: 201 });
}
