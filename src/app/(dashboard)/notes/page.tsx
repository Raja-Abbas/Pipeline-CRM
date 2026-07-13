"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatRelativeTime, getInitials } from "@/lib/utils";
import { Plus, Search, FileText, MessageSquare, Calendar, Link as LinkIcon } from "lucide-react";

const notes = [
  { id: "1", title: "Acme Corp Discovery Call", content: "Discussed their current workflow and pain points. They're looking for better pipeline visibility and automated follow-ups. Decision maker is Sarah Chen, VP of Engineering. Budget approved for Q3.", author: "John Doe", contact: "Sarah Chen", deal: "Acme Corp - Enterprise Plan", createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), tags: ["Call", "Discovery"] },
  { id: "2", title: "TechStart Proposal Notes", content: "Sent customized pricing proposal. They want monthly billing instead of annual. Need to follow up about API access limits.", author: "John Doe", contact: "Mike Johnson", deal: "TechStart Annual License", createdAt: new Date(Date.now() - 86400000).toISOString(), tags: ["Proposal"] },
  { id: "3", title: "GlobalCo Requirements", content: "Needs CRM migration from Salesforce. 500+ contacts, custom fields, API integrations. Looking for enterprise SLA.", author: "John Doe", contact: "Emma Davis", deal: "GlobalCo CRM Migration", createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), tags: ["Requirements", "Enterprise"] },
  { id: "4", title: "Weekly Pipeline Review", content: "Total pipeline: $1.27M. Focus on moving negotiation deals to close. Need to add 3 new leads this week.", author: "John Doe", contact: null, deal: null, createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), tags: ["Internal", "Review"] },
];

export default function NotesPage() {
  const [search, setSearch] = useState("");

  const filtered = notes.filter((n) => {
    const q = search.toLowerCase();
    return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground">{notes.length} notes</p>
        </div>
        <Button size="sm" className="gap-2 rounded-xl">
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((note) => (
          <Card key={note.id} className="hover:card-shadow-hover transition-all duration-300 cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-sm">{note.title}</h3>
                </div>
                <div className="flex gap-1">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {note.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                      {getInitials(note.author)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{formatRelativeTime(note.createdAt)}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {note.contact && (
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {note.contact}
                    </span>
                  )}
                  {note.deal && (
                    <span className="flex items-center gap-1">
                      <LinkIcon className="h-3 w-3" />
                      {note.deal.split(" ")[0]}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
