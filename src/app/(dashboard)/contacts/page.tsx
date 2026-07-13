"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, formatRelativeTime } from "@/lib/utils";
import { Plus, Search, Mail, Phone, Building2, MoreHorizontal, Filter } from "lucide-react";

const contacts = [
  { id: "1", firstName: "Sarah", lastName: "Chen", email: "sarah@acmecorp.com", phone: "+1 (555) 123-4567", title: "VP of Engineering", company: "Acme Corp", lastActivity: "2h ago", dealCount: 2, tags: ["Enterprise", "Active"] },
  { id: "2", firstName: "Mike", lastName: "Johnson", email: "mike@techstart.io", phone: "+1 (555) 234-5678", title: "CTO", company: "TechStart", lastActivity: "5h ago", dealCount: 1, tags: ["Startup"] },
  { id: "3", firstName: "Emma", lastName: "Davis", email: "emma@globalco.com", phone: "+1 (555) 345-6789", title: "Director of Operations", company: "GlobalCo", lastActivity: "1d ago", dealCount: 3, tags: ["Enterprise", "VIP"] },
  { id: "4", firstName: "James", lastName: "Wilson", email: "james@retailpro.com", phone: "+1 (555) 456-7890", title: "Product Manager", company: "RetailPro", lastActivity: "2d ago", dealCount: 1, tags: ["Mid-Market"] },
  { id: "5", firstName: "Lisa", lastName: "Park", email: "lisa@dataflow.ai", phone: "+1 (555) 567-8901", title: "Head of Data", company: "DataFlow AI", lastActivity: "3d ago", dealCount: 2, tags: ["AI/ML", "Active"] },
  { id: "6", firstName: "David", lastName: "Kim", email: "david@stellar.io", phone: "+1 (555) 678-9012", title: "CEO", company: "Stellar SaaS", lastActivity: "1w ago", dealCount: 1, tags: ["SaaS"] },
  { id: "7", firstName: "Anna", lastName: "Lee", email: "anna@finedge.com", phone: "+1 (555) 789-0123", title: "CFO", company: "FinEdge", lastActivity: "4d ago", dealCount: 1, tags: ["Finance"] },
  { id: "8", firstName: "Ryan", lastName: "Chen", email: "ryan@medtech.com", phone: "+1 (555) 890-1234", title: "VP Product", company: "MedTech", lastActivity: "5d ago", dealCount: 1, tags: ["Healthcare"] },
];

export default function ContactsPage() {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">{contacts.length} contacts total</p>
        </div>
        <Button size="sm" className="gap-2 rounded-xl">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 rounded-xl">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                    {getInitials(`${contact.firstName} ${contact.lastName}`)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{contact.firstName} {contact.lastName}</p>
                    {contact.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{contact.title} &middot; {contact.company}</p>
                </div>

                <div className="hidden md:flex items-center gap-4 text-muted-foreground">
                  <a href={`mailto:${contact.email}`} className="hover:text-foreground transition-colors">
                    <Mail className="h-4 w-4" />
                  </a>
                  <a href={`tel:${contact.phone}`} className="hover:text-foreground transition-colors">
                    <Phone className="h-4 w-4" />
                  </a>
                </div>

                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{contact.lastActivity}</p>
                  <p className="text-xs text-muted-foreground">{contact.dealCount} deal{contact.dealCount !== 1 ? "s" : ""}</p>
                </div>

                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
