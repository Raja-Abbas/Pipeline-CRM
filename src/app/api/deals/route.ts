import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as Record<string, unknown>).id as string;
    const membership = await prisma.workspaceMember.findFirst({
      where: { userId },
    });

    if (!membership) {
      return NextResponse.json({ deals: [] });
    }

    const deals = await prisma.deal.findMany({
      where: { workspaceId: membership.workspaceId },
      include: { stage: true, pipeline: true, company: true, creator: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ deals });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as Record<string, unknown>).id as string;
    const membership = await prisma.workspaceMember.findFirst({
      where: { userId },
    });

    if (!membership) {
      return NextResponse.json({ error: "No workspace" }, { status: 400 });
    }

    const body = await req.json();
    const { title, value, stageId, pipelineId, companyId, leadId, notes } = body;

    if (!title || !stageId || !pipelineId) {
      return NextResponse.json({ error: "Title, stage, and pipeline required" }, { status: 400 });
    }

    const deal = await prisma.deal.create({
      data: {
        title,
        value: value || 0,
        stageId,
        pipelineId,
        companyId: companyId || null,
        leadId: leadId || null,
        notes: notes || null,
        creatorId: userId,
        workspaceId: membership.workspaceId,
      },
    });

    await prisma.activity.create({
      data: {
        type: "DEAL_CREATED",
        title: `Created deal: ${title}`,
        description: `Value: $${(value || 0).toLocaleString()}`,
        workspaceId: membership.workspaceId,
        userId,
        dealId: deal.id,
      },
    });

    return NextResponse.json({ deal }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
