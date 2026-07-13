import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({ url: "file:prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("password123", 12);

  const user = await prisma.user.create({
    data: {
      email: "john@acmecorp.com",
      name: "John Doe",
      passwordHash,
      role: "ADMIN",
    },
  });

  const workspace = await prisma.workspace.create({
    data: {
      name: "Acme Inc",
      slug: "acme-inc",
      ownerId: user.id,
    },
  });

  await prisma.workspaceMember.create({
    data: { userId: user.id, workspaceId: workspace.id, role: "OWNER" },
  });

  await prisma.subscription.create({
    data: { workspaceId: workspace.id, plan: "FREE", status: "ACTIVE" },
  });

  const pipeline = await prisma.pipeline.create({
    data: { name: "Sales Pipeline", isDefault: true, workspaceId: workspace.id },
  });

  const stages = ["Lead", "Contacted", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];
  const stageColors = ["#64748b", "#3b82f6", "#6366f1", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];
  const stageRecords = [];

  for (let i = 0; i < stages.length; i++) {
    const stage = await prisma.pipelineStage.create({
      data: { name: stages[i], position: i, color: stageColors[i], pipelineId: pipeline.id },
    });
    stageRecords.push(stage);
  }

  const companies = await Promise.all([
    prisma.company.create({ data: { name: "Acme Corp", industry: "Technology", workspaceId: workspace.id } }),
    prisma.company.create({ data: { name: "TechStart", industry: "SaaS", workspaceId: workspace.id } }),
    prisma.company.create({ data: { name: "GlobalCo", industry: "Manufacturing", workspaceId: workspace.id } }),
  ]);

  const contacts = await Promise.all([
    prisma.contact.create({ data: { firstName: "Sarah", lastName: "Chen", email: "sarah@acmecorp.com", title: "VP Engineering", ownerId: user.id, companyId: companies[0].id, workspaceId: workspace.id } }),
    prisma.contact.create({ data: { firstName: "Mike", lastName: "Johnson", email: "mike@techstart.io", title: "CTO", companyId: companies[1].id, workspaceId: workspace.id } }),
    prisma.contact.create({ data: { firstName: "Emma", lastName: "Davis", email: "emma@globalco.com", title: "Director of Ops", companyId: companies[2].id, workspaceId: workspace.id } }),
  ]);

  await Promise.all([
    prisma.deal.create({ data: { title: "Acme Corp Enterprise Plan", value: 45000, stageId: stageRecords[4].id, pipelineId: pipeline.id, companyId: companies[0].id, creatorId: user.id, workspaceId: workspace.id } }),
    prisma.deal.create({ data: { title: "TechStart Annual License", value: 12000, stageId: stageRecords[3].id, pipelineId: pipeline.id, companyId: companies[1].id, creatorId: user.id, workspaceId: workspace.id } }),
    prisma.deal.create({ data: { title: "GlobalCo CRM Migration", value: 85000, stageId: stageRecords[2].id, pipelineId: pipeline.id, companyId: companies[2].id, creatorId: user.id, workspaceId: workspace.id } }),
  ]);

  await Promise.all([
    prisma.task.create({ data: { title: "Follow up with Acme Corp", priority: "HIGH", dueDate: new Date(), assigneeId: user.id, workspaceId: workspace.id } }),
    prisma.task.create({ data: { title: "Send proposal to TechStart", priority: "MEDIUM", dueDate: new Date(Date.now() + 86400000), assigneeId: user.id, workspaceId: workspace.id } }),
  ]);

  console.log("Seed complete!");
  console.log("Login: john@acmecorp.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
