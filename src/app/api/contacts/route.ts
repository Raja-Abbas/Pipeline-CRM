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
      return NextResponse.json({ contacts: [] });
    }

    const contacts = await prisma.contact.findMany({
      where: { workspaceId: membership.workspaceId },
      include: { company: true, owner: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ contacts });
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
    const { firstName, lastName, email, phone, title, companyId } = body;

    if (!firstName || !lastName) {
      return NextResponse.json({ error: "First and last name required" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email: email || null,
        phone: phone || null,
        title: title || null,
        companyId: companyId || null,
        ownerId: userId,
        workspaceId: membership.workspaceId,
      },
    });

    await prisma.activity.create({
      data: {
        type: "CONTACT_CREATED",
        title: `Created contact ${firstName} ${lastName}`,
        workspaceId: membership.workspaceId,
        userId,
        contactId: contact.id,
      },
    });

    return NextResponse.json({ contact }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
