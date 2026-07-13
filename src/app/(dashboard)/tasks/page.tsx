"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, getPriorityColor, formatRelativeTime } from "@/lib/utils";
import { Plus, Search, Calendar, Clock, AlertCircle, CheckCircle2, Filter } from "lucide-react";

const tasks = [
  { id: "1", title: "Follow up with Acme Corp", description: "Discuss enterprise plan pricing", priority: "HIGH", status: "PENDING", dueDate: "2026-07-12", deal: "Acme Corp - Enterprise Plan", createdAt: "2h ago" },
  { id: "2", title: "Send proposal to TechStart", description: "Include custom pricing tier", priority: "MEDIUM", status: "PENDING", dueDate: "2026-07-13", deal: "TechStart Annual License", createdAt: "5h ago" },
  { id: "3", title: "Review contract terms", description: "Legal review needed", priority: "HIGH", status: "PENDING", dueDate: "2026-07-14", deal: "BrightWave Enterprise", createdAt: "1d ago" },
  { id: "4", title: "Schedule demo with GlobalCo", description: "30-min product walkthrough", priority: "LOW", status: "COMPLETED", dueDate: "2026-07-11", deal: "GlobalCo CRM Migration", createdAt: "2d ago" },
  { id: "5", title: "Update CRM records", description: "Add notes from last meeting", priority: "LOW", status: "PENDING", dueDate: "2026-07-15", deal: null, createdAt: "3d ago" },
  { id: "6", title: "Prepare Q3 forecast", description: "Revenue projections for pipeline", priority: "MEDIUM", status: "PENDING", dueDate: "2026-07-20", deal: null, createdAt: "4d ago" },
];

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const filtered = tasks.filter((t) => {
    const q = search.toLowerCase();
    const matchesSearch = t.title.toLowerCase().includes(q) || (t.deal && t.deal.toLowerCase().includes(q));
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && t.status === "PENDING") ||
      (filter === "completed" && t.status === "COMPLETED");
    return matchesSearch && matchesFilter;
  });

  const pendingCount = tasks.filter((t) => t.status === "PENDING").length;
  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">{pendingCount} pending &middot; {completedCount} completed</p>
        </div>
        <Button size="sm" className="gap-2 rounded-xl">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
          {(["all", "pending", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize",
                filter === f ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((task) => (
          <Card key={task.id} className={cn("hover:card-shadow-hover transition-all duration-200", task.status === "COMPLETED" && "opacity-60")}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={task.status === "COMPLETED"}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={cn("text-sm font-medium", task.status === "COMPLETED" && "line-through")}>
                      {task.title}
                    </p>
                    <Badge variant={task.priority === "HIGH" ? "warning" : "secondary"} className="text-[10px]">
                      {task.priority}
                    </Badge>
                  </div>
                  {task.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {task.dueDate}
                    </span>
                    {task.deal && (
                      <span className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {task.deal}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
