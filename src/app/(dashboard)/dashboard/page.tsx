"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn, formatCurrency, formatRelativeTime, getStageColor } from "@/lib/utils";
import {
  Target,
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42000, deals: 12 },
  { month: "Feb", revenue: 38000, deals: 9 },
  { month: "Mar", revenue: 55000, deals: 15 },
  { month: "Apr", revenue: 47000, deals: 11 },
  { month: "May", revenue: 62000, deals: 18 },
  { month: "Jun", revenue: 58000, deals: 16 },
  { month: "Jul", revenue: 71000, deals: 21 },
];

const pipelineData = [
  { stage: "Lead", count: 24, value: 180000 },
  { stage: "Contacted", count: 18, value: 245000 },
  { stage: "Qualified", count: 12, value: 380000 },
  { stage: "Proposal", count: 8, value: 290000 },
  { stage: "Negotiation", count: 5, value: 175000 },
];

const dealStagePie = [
  { name: "Active", value: 67, color: "#10b981" },
  { name: "Won", value: 23, color: "#059669" },
  { name: "Lost", value: 10, color: "#ef4444" },
];

const recentDeals = [
  { id: "1", title: "Acme Corp - Enterprise Plan", value: 45000, stage: "NEGOTIATION", contact: "Sarah Chen", daysLeft: 3 },
  { id: "2", title: "TechStart Annual License", value: 12000, stage: "PROPOSAL", contact: "Mike Johnson", daysLeft: 7 },
  { id: "3", title: "GlobalCo CRM Migration", value: 85000, stage: "QUALIFIED", contact: "Emma Davis", daysLeft: 14 },
  { id: "4", title: "RetailPro Integration", value: 28000, stage: "CONTACTED", contact: "James Wilson", daysLeft: 21 },
  { id: "5", title: "DataFlow Analytics Suite", value: 67000, stage: "LEAD", contact: "Lisa Park", daysLeft: 30 },
];

const upcomingTasks = [
  { id: "1", title: "Follow up with Acme Corp", priority: "HIGH", dueDate: "Today", completed: false },
  { id: "2", title: "Send proposal to TechStart", priority: "MEDIUM", dueDate: "Tomorrow", completed: false },
  { id: "3", title: "Review contract terms", priority: "HIGH", dueDate: "In 2 days", completed: false },
  { id: "4", title: "Schedule demo with GlobalCo", priority: "LOW", dueDate: "In 3 days", completed: true },
];

const stats = [
  { label: "Total Pipeline", value: "$1.27M", change: "+12.5%", up: true, icon: DollarSign, color: "text-emerald-600" },
  { label: "Active Deals", value: "67", change: "+8 this week", up: true, icon: Target, color: "text-blue-600" },
  { label: "Contacts", value: "284", change: "+23 this month", up: true, icon: Users, color: "text-purple-600" },
  { label: "Win Rate", value: "34%", change: "+2.1%", up: true, icon: TrendingUp, color: "text-amber-600" },
];

export default function DashboardPage() {
  const [chartTab, setChartTab] = useState("revenue");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Your sales pipeline at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/pipeline">
            <Button variant="outline" size="sm" className="gap-2 rounded-xl">
              <Calendar className="h-4 w-4" />
              Pipeline
            </Button>
          </Link>
          <Link href="/deals/new">
            <Button size="sm" className="gap-2 rounded-xl">
              <Plus className="h-4 w-4" />
              New Deal
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:card-shadow-hover transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.up ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-600" />
                    )}
                    <span className={cn("text-xs font-medium", stat.up ? "text-emerald-600" : "text-red-600")}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={cn("rounded-xl bg-muted p-3", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue and deal count</CardDescription>
              </div>
              <Tabs value={chartTab} onValueChange={setChartTab}>
                <TabsList className="h-8">
                  <TabsTrigger value="revenue" className="text-xs px-3">Revenue</TabsTrigger>
                  <TabsTrigger value="deals" className="text-xs px-3">Deals</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartTab === "revenue" ? (
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: "var(--muted-foreground)" }} />
                    <YAxis className="text-xs" tick={{ fill: "var(--muted-foreground)" }} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        fontSize: "13px",
                      }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(value: any) => [formatCurrency(Number(value)), "Revenue"]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revenueGrad)" />
                  </AreaChart>
                ) : (
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: "var(--muted-foreground)" }} />
                    <YAxis className="text-xs" tick={{ fill: "var(--muted-foreground)" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        fontSize: "13px",
                      }}
                    />
                    <Bar dataKey="deals" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Deal Distribution</CardTitle>
            <CardDescription>Active vs won vs lost</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dealStagePie}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {dealStagePie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      fontSize: "13px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {dealStagePie.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline stages */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Pipeline Stages</CardTitle>
              <CardDescription>Deals by pipeline stage</CardDescription>
            </div>
            <Link href="/pipeline">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View Pipeline <ArrowUpRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {pipelineData.map((stage, i) => (
              <div
                key={stage.stage}
                className="rounded-xl border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: ["#64748b", "#3b82f6", "#6366f1", "#8b5cf6", "#f59e0b"][i],
                    }}
                  />
                  <span className="text-xs font-medium text-muted-foreground">{stage.stage}</span>
                </div>
                <p className="text-xl font-bold">{stage.count}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatCurrency(stage.value)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent deals and tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent Deals</CardTitle>
                <CardDescription>Latest deals in your pipeline</CardDescription>
              </div>
              <Link href="/deals">
                <Button variant="ghost" size="sm" className="text-xs">View all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between rounded-xl border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{deal.title}</p>
                    <p className="text-xs text-muted-foreground">{deal.contact}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-lg border", getStageColor(deal.stage))}>
                      {deal.stage.replace("_", " ")}
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatCurrency(deal.value)}</p>
                      <p className="text-xs text-muted-foreground">{deal.daysLeft}d left</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Upcoming Tasks</CardTitle>
                <CardDescription>Tasks that need your attention</CardDescription>
              </div>
              <Link href="/tasks">
                <Button variant="ghost" size="sm" className="text-xs">View all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 hover:bg-muted/50 transition-colors",
                    task.completed && "opacity-50"
                  )}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  ) : task.priority === "HIGH" ? (
                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium", task.completed && "line-through")}>
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                  </div>
                  <Badge variant={task.priority === "HIGH" ? "warning" : task.completed ? "success" : "secondary"}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
