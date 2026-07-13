"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
import { Plus, GripVertical, MoreHorizontal } from "lucide-react";

interface Deal {
  id: string;
  title: string;
  value: number;
  contact: string;
  daysLeft: number;
}

interface Stage {
  id: string;
  name: string;
  color: string;
  deals: Deal[];
}

const initialStages: Stage[] = [
  {
    id: "lead",
    name: "Lead",
    color: "#64748b",
    deals: [
      { id: "d1", title: "DataFlow Analytics Suite", value: 67000, contact: "Lisa Park", daysLeft: 30 },
      { id: "d2", title: "CloudNine Migration", value: 23000, contact: "Tom Hardy", daysLeft: 25 },
    ],
  },
  {
    id: "contacted",
    name: "Contacted",
    color: "#3b82f6",
    deals: [
      { id: "d3", title: "RetailPro Integration", value: 28000, contact: "James Wilson", daysLeft: 21 },
      { id: "d4", title: "FinEdge Platform", value: 42000, contact: "Anna Lee", daysLeft: 18 },
    ],
  },
  {
    id: "qualified",
    name: "Qualified",
    color: "#6366f1",
    deals: [
      { id: "d5", title: "GlobalCo CRM Migration", value: 85000, contact: "Emma Davis", daysLeft: 14 },
      { id: "d6", title: "MedTech Analytics", value: 34000, contact: "Ryan Chen", daysLeft: 12 },
    ],
  },
  {
    id: "proposal",
    name: "Proposal",
    color: "#8b5cf6",
    deals: [
      { id: "d7", title: "TechStart Annual License", value: 12000, contact: "Mike Johnson", daysLeft: 7 },
      { id: "d8", title: "BrightWave Enterprise", value: 56000, contact: "Sophia Garcia", daysLeft: 10 },
    ],
  },
  {
    id: "negotiation",
    name: "Negotiation",
    color: "#f59e0b",
    deals: [
      { id: "d9", title: "Acme Corp - Enterprise Plan", value: 45000, contact: "Sarah Chen", daysLeft: 3 },
    ],
  },
  {
    id: "won",
    name: "Closed Won",
    color: "#10b981",
    deals: [
      { id: "d10", title: "Stellar SaaS Platform", value: 38000, contact: "David Kim", daysLeft: 0 },
    ],
  },
];

function SortableDealCard({ deal, stageColor }: { deal: Deal; stageColor: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: deal.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-card rounded-xl border p-3 cursor-grab active:cursor-grabbing hover:card-shadow-hover transition-all duration-200 group",
        isDragging && "opacity-50 card-shadow-hover"
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium leading-tight flex-1 pr-2">{deal.title}</p>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{deal.contact}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{formatCurrency(deal.value)}</span>
        {deal.daysLeft > 0 && (
          <span className={cn(
            "text-xs px-1.5 py-0.5 rounded-md",
            deal.daysLeft <= 5 ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"
          )}>
            {deal.daysLeft}d
          </span>
        )}
      </div>
      <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.max(10, Math.min(100, (deal.value / 100000) * 100))}%`,
            backgroundColor: stageColor,
          }}
        />
      </div>
    </div>
  );
}

function DealCardOverlay({ deal }: { deal: Deal }) {
  return (
    <div className="bg-card rounded-xl border p-3 card-shadow-hover rotate-2 w-[260px]">
      <p className="text-sm font-medium mb-1">{deal.title}</p>
      <p className="text-xs text-muted-foreground mb-2">{deal.contact}</p>
      <span className="text-sm font-semibold">{formatCurrency(deal.value)}</span>
    </div>
  );
}

export default function PipelinePage() {
  const [stages, setStages] = useState(initialStages);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function findStageByDealId(dealId: string): Stage | undefined {
    return stages.find((s) => s.deals.some((d) => d.id === dealId));
  }

  function findDealById(dealId: string): Deal | undefined {
    for (const stage of stages) {
      const deal = stage.deals.find((d) => d.id === dealId);
      if (deal) return deal;
    }
    return undefined;
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeDealId = active.id as string;
    const overId = over.id as string;

    const sourceStage = findStageByDealId(activeDealId);
    if (!sourceStage) return;

    // Check if dropped on a stage container
    const targetStage = stages.find((s) => s.id === overId);
    if (targetStage && sourceStage.id !== targetStage.id) {
      setStages((prev) => {
        const deal = sourceStage.deals.find((d) => d.id === activeDealId);
        if (!deal) return prev;

        return prev.map((s) => {
          if (s.id === sourceStage.id) {
            return { ...s, deals: s.deals.filter((d) => d.id !== activeDealId) };
          }
          if (s.id === targetStage.id) {
            return { ...s, deals: [...s.deals, deal] };
          }
          return s;
        });
      });
      return;
    }

    // Check if dropped on another deal card
    const overStage = findStageByDealId(overId);
    if (!overStage) return;

    if (sourceStage.id === overStage.id) {
      // Reorder within same stage
      setStages((prev) =>
        prev.map((s) => {
          if (s.id !== sourceStage.id) return s;
          const oldIndex = s.deals.findIndex((d) => d.id === activeDealId);
          const newIndex = s.deals.findIndex((d) => d.id === overId);
          if (oldIndex === -1 || newIndex === -1) return s;
          return { ...s, deals: arrayMove(s.deals, oldIndex, newIndex) };
        })
      );
    } else {
      // Move to different stage
      setStages((prev) => {
        const deal = sourceStage.deals.find((d) => d.id === activeDealId);
        if (!deal) return prev;

        return prev.map((s) => {
          if (s.id === sourceStage.id) {
            return { ...s, deals: s.deals.filter((d) => d.id !== activeDealId) };
          }
          if (s.id === overStage.id) {
            const overIndex = s.deals.findIndex((d) => d.id === overId);
            const newDeals = [...s.deals];
            newDeals.splice(overIndex, 0, deal);
            return { ...s, deals: newDeals };
          }
          return s;
        });
      });
    }
  }

  const totalValue = stages.reduce((sum, s) => sum + s.deals.reduce((ds, d) => ds + d.value, 0), 0);
  const totalDeals = stages.reduce((sum, s) => sum + s.deals.length, 0);

  const activeDeal = activeId ? findDealById(activeId) : undefined;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground">
            {totalDeals} deals &middot; {formatCurrency(totalValue)} total value
          </p>
        </div>
        <Button size="sm" className="gap-2 rounded-xl">
          <Plus className="h-4 w-4" />
          New Deal
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageValue = stage.deals.reduce((sum, d) => sum + d.value, 0);
            return (
              <div
                key={stage.id}
                className="flex-shrink-0 w-[280px]"
                onPointerUp={() => {
                  if (activeId) {
                    const deal = findDealById(activeId);
                    if (deal) {
                      setStages((prev) => {
                        const sourceStage = prev.find((s) => s.deals.some((d) => d.id === activeId));
                        if (!sourceStage) return prev;
                        return prev.map((s) => {
                          if (s.id === sourceStage.id) {
                            return { ...s, deals: s.deals.filter((d) => d.id !== activeId) };
                          }
                          if (s.id === stage.id) {
                            return { ...s, deals: [...s.deals, deal] };
                          }
                          return s;
                        });
                      });
                    }
                  }
                }}
              >
                <Card className="h-full bg-muted/30">
                  <CardHeader className="p-3 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: stage.color }}
                        />
                        <CardTitle className="text-sm font-semibold">{stage.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs px-1.5 py-0">
                          {stage.deals.length}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatCurrency(stageValue)}</p>
                  </CardHeader>
                  <CardContent className="p-2 pt-0">
                    <SortableContext items={stage.deals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-2 min-h-[60px]">
                        {stage.deals.map((deal) => (
                          <SortableDealCard key={deal.id} deal={deal} stageColor={stage.color} />
                        ))}
                      </div>
                    </SortableContext>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeDeal ? <DealCardOverlay deal={activeDeal} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
