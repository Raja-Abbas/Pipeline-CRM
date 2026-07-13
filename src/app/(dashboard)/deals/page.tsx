"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, getStageColor } from "@/lib/utils";
import { Plus, Search, Filter, ArrowUpDown, MoreHorizontal } from "lucide-react";

const deals = [
  { id: "1", title: "Acme Corp - Enterprise Plan", value: 45000, stage: "NEGOTIATION", contact: "Sarah Chen", company: "Acme Corp", expectedClose: "Jul 15, 2026", priority: "HIGH" },
  { id: "2", title: "TechStart Annual License", value: 12000, stage: "PROPOSAL", contact: "Mike Johnson", company: "TechStart", expectedClose: "Jul 20, 2026", priority: "MEDIUM" },
  { id: "3", title: "GlobalCo CRM Migration", value: 85000, stage: "QUALIFIED", contact: "Emma Davis", company: "GlobalCo", expectedClose: "Aug 1, 2026", priority: "HIGH" },
  { id: "4", title: "RetailPro Integration", value: 28000, stage: "CONTACTED", contact: "James Wilson", company: "RetailPro", expectedClose: "Aug 15, 2026", priority: "LOW" },
  { id: "5", title: "DataFlow Analytics Suite", value: 67000, stage: "LEAD", contact: "Lisa Park", company: "DataFlow AI", expectedClose: "Sep 1, 2026", priority: "MEDIUM" },
  { id: "6", title: "FinEdge Platform", value: 42000, stage: "CONTACTED", contact: "Anna Lee", company: "FinEdge", expectedClose: "Aug 10, 2026", priority: "HIGH" },
  { id: "7", title: "MedTech Analytics", value: 34000, stage: "QUALIFIED", contact: "Ryan Chen", company: "MedTech", expectedClose: "Aug 20, 2026", priority: "MEDIUM" },
  { id: "8", title: "BrightWave Enterprise", value: 56000, stage: "PROPOSAL", contact: "Sophia Garcia", company: "BrightWave", expectedClose: "Jul 25, 2026", priority: "HIGH" },
];

export default function DealsPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"value" | "title" | "expectedClose">("value");

  const filtered = deals
    .filter((d) => {
      const q = search.toLowerCase();
      return d.title.toLowerCase().includes(q) || d.contact.toLowerCase().includes(q) || d.company.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortKey === "value") return b.value - a.value;
      return 0;
    });

  const totalValue = filtered.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deals</h1>
          <p className="text-muted-foreground">{filtered.length} deals &middot; {formatCurrency(totalValue)} total</p>
        </div>
        <Button size="sm" className="gap-2 rounded-xl">
          <Plus className="h-4 w-4" />
          New Deal
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 rounded-xl">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" size="sm" className="gap-2 rounded-xl" onClick={() => setSortKey(sortKey === "value" ? "title" : "value")}>
          <ArrowUpDown className="h-4 w-4" />
          Sort
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-muted-foreground p-4">Deal</th>
                  <th className="text-left text-xs font-medium text-muted-foreground p-4">Contact</th>
                  <th className="text-left text-xs font-medium text-muted-foreground p-4">Stage</th>
                  <th className="text-left text-xs font-medium text-muted-foreground p-4">Value</th>
                  <th className="text-left text-xs font-medium text-muted-foreground p-4">Close Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground p-4">Priority</th>
                  <th className="w-10 p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((deal) => (
                  <tr key={deal.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <td className="p-4">
                      <p className="text-sm font-medium">{deal.title}</p>
                      <p className="text-xs text-muted-foreground">{deal.company}</p>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{deal.contact}</td>
                    <td className="p-4">
                      <span className={cn("text-xs px-2 py-0.5 rounded-lg border", getStageColor(deal.stage))}>
                        {deal.stage.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-semibold">{formatCurrency(deal.value)}</td>
                    <td className="p-4 text-sm text-muted-foreground">{deal.expectedClose}</td>
                    <td className="p-4">
                      <Badge variant={deal.priority === "HIGH" ? "warning" : deal.priority === "MEDIUM" ? "secondary" : "outline"}>
                        {deal.priority}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
