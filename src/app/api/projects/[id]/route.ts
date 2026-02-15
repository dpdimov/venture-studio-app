import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const privateKey = searchParams.get("private_key");

  const project = await prisma.project.findUnique({
    where: { id },
    include: { createdBy: { select: { name: true } } },
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // If project is not visible, only allow access with private key or admin session
  if (!project.isVisible) {
    if (privateKey !== project.privateKey) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.isAdmin) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    }
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  // Check for admin session or edit key
  const { searchParams } = new URL(request.url);
  const editKey = searchParams.get("editKey");
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.isAdmin;

  if (!isAdmin) {
    if (!editKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project || project.editKey !== editKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const body = await request.json();
  const project = await prisma.project.update({
    where: { id },
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
      ...(isAdmin
        ? {
            isPrivate: body.isPrivate,
            isVisible: body.isVisible,
            surveyEnabled: body.surveyEnabled,
          }
        : {}),
    },
    include: { createdBy: { select: { name: true } } },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
