import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      title: body.title,
      shortDescription: body.shortDescription || null,
      problem: body.problem || null,
      solution: body.solution || null,
      product: body.product || null,
      advantage: body.advantage || null,
      market: body.market || null,
      vision: body.vision || null,
      team: body.team || null,
      funding: body.funding || null,
      nextMilestone: body.nextMilestone || null,
      image: body.image || null,
      video: body.video || null,
      isVisible: true,
      surveyEnabled: true,
    },
  });

  return NextResponse.json(
    { id: project.id, editKey: project.editKey },
    { status: 201 },
  );
}
