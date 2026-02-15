import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [projects, surveys] = await Promise.all([
    prisma.project.count(),
    prisma.surveyResponse.count(),
  ]);

  return NextResponse.json({ projects, surveys });
}
