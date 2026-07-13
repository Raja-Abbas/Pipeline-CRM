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
      return NextResponse.json({ companies: [] });
    }

    const companies = await prisma.company.findMany({
      where: { workspaceId: membership.workspaceId },
      include: { contacts: true, deals: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ companies });
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
    const { name, industry, website, phone, address, size } = body;

    if (!name) {
      return NextResponse.json({ error: "Company name required" }, { status: 400 });
    }

    const company = await prisma.company.create({
      data: {
        name,
        industry: industry || null,
        website: website || null,
        phone: phone || null,
        address: address || null,
        size: size || null,
        workspaceId: membership.workspaceId,
      },
    });

    return NextResponse.json({ company }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
