import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");

  const projects = await prisma.project.findMany({
    where: { isVisible: true },
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: parseInt(limit) } : {}),
    select: {
      id: true,
      title: true,
      shortDescription: true,
      image: true,
      createdAt: true,
      surveyEnabled: true,
      createdBy: { select: { name: true } },
    },
  });

  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const project = await prisma.project.create({
    data: {
      title: body.title,
      shortDescription: body.shortDescription,
      problem: body.problem,
      solution: body.solution,
      product: body.product,
      advantage: body.advantage,
      market: body.market,
      vision: body.vision,
      team: body.team,
      funding: body.funding,
      nextMilestone: body.nextMilestone,
      image: body.image,
      video: body.video,
      attachments: body.attachments,
      isPrivate: body.isPrivate ?? false,
      isVisible: body.isVisible ?? true,
      surveyEnabled: body.surveyEnabled ?? false,
      createdById: session.user.id,
    },
    include: { createdBy: { select: { name: true } } },
  });

  return NextResponse.json(project, { status: 201 });
}
