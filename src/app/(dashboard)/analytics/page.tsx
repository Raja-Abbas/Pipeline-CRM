"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, formatCompactNumber } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42000, target: 40000 },
  { month: "Feb", revenue: 38000, target: 42000 },
  { month: "Mar", revenue: 55000, target: 45000 },
  { month: "Apr", revenue: 47000, target: 48000 },
  { month: "May", revenue: 62000, target: 50000 },
  { month: "Jun", revenue: 58000, target: 55000 },
  { month: "Jul", revenue: 71000, target: 60000 },
];

const conversionData = [
  { stage: "Lead", count: 24, rate: 100 },
  { stage: "Contacted", count: 18, rate: 75 },
  { stage: "Qualified", count: 12, rate: 50 },
  { stage: "Proposal", count: 8, rate: 33 },
  { stage: "Negotiation", count: 5, rate: 21 },
  { stage: "Won", count: 3, rate: 13 },
];

const topDeals = [
  { name: "GlobalCo CRM Migration", value: 85000, stage: "Qualified", probability: 60 },
  { name: "DataFlow Analytics Suite", value: 67000, stage: "Lead", probability: 20 },
  { name: "BrightWave Enterprise", value: 56000, stage: "Proposal", probability: 70 },
  { name: "Acme Corp Enterprise", value: 45000, stage: "Negotiation", probability: 85 },
  { name: "FinEdge Platform", value: 42000, stage: "Contacted", probability: 35 },
];

const sourceData = [
  { name: "Website", value: 35, color: "#10b981" },
  { name: "Referral", value: 28, color: "#059669" },
  { name: "Cold Outreach", value: 20, color: "#06b6d4" },
  { name: "Events", value: 12, color: "#8b5cf6" },
  { name: "Partner", value: 5, color: "#f59e0b" },
];

const stats = [
  { label: "Total Revenue", value: "$373K", change: "+18.2%", up: true, icon: DollarSign },
  { label: "Avg Deal Size", value: "$46.6K", change: "+5.3%", up: true, icon: Target },
  { label: "Win Rate", value: "34%", change: "+2.1%", up: true, icon: TrendingUp },
  { label: "Avg Cycle", value: "28d", change: "-3 days", up: true, icon: Clock },
];

export default function AnalyticsPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Sales performance and pipeline insights</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
                  </div>
                </div>
                <div className="rounded-xl bg-emerald-100 dark:bg-emerald-500/10 p-3">
                  <stat.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Revenue vs Target</CardTitle>
                <CardDescription>Monthly revenue against targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" tick={{ fill: "var(--muted-foreground)" }} />
                      <YAxis className="text-xs" tick={{ fill: "var(--muted-foreground)" }} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "13px" }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any) => [formatCurrency(Number(value))]}
                      />
                      <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} name="Revenue" />
                      <Bar dataKey="target" fill="#e2e8f0" radius={[6, 6, 0, 0]} name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Top Deals by Value</CardTitle>
                <CardDescription>Largest deals in your pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topDeals.map((deal, i) => (
                    <div key={deal.name} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{deal.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${deal.probability}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground">{deal.probability}%</span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">{formatCurrency(deal.value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Pipeline Conversion Funnel</CardTitle>
              <CardDescription>Deal flow through pipeline stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionData.map((stage, i) => (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-28">{stage.stage}</span>
                    <div className="flex-1">
                      <div className="h-8 bg-muted rounded-lg overflow-hidden">
                        <div
                          className="h-full rounded-lg transition-all duration-500 flex items-center px-3"
                          style={{
                            width: `${stage.rate}%`,
                            backgroundColor: `hsl(${160 + i * 10}, 60%, ${45 - i * 3}%)`,
                          }}
                        >
                          <span className="text-xs text-white font-medium">{stage.count} deals</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">{stage.rate}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Lead Sources</CardTitle>
                <CardDescription>Where your leads come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sourceData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "13px" }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any) => [`${value}%`]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2 flex-wrap">
                  {sourceData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-muted-foreground">{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Conversion by Source</CardTitle>
                <CardDescription>Win rate per lead source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Referral", rate: 42, deals: 28, color: "#10b981" },
                    { source: "Website", rate: 35, deals: 35, color: "#059669" },
                    { source: "Events", rate: 31, deals: 12, color: "#06b6d4" },
                    { source: "Partner", rate: 28, deals: 5, color: "#8b5cf6" },
                    { source: "Cold Outreach", rate: 18, deals: 20, color: "#f59e0b" },
                  ].map((item) => (
                    <div key={item.source} className="flex items-center gap-4">
                      <span className="text-sm w-28">{item.source}</span>
                      <div className="flex-1">
                        <div className="h-6 bg-muted rounded-lg overflow-hidden">
                          <div
                            className="h-full rounded-lg flex items-center px-2"
                            style={{ width: `${item.rate * 2}%`, backgroundColor: item.color }}
                          >
                            <span className="text-[10px] text-white font-medium">{item.deals} deals</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold w-10 text-right">{item.rate}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
