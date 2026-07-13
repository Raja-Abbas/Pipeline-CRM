"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Plus, Search, Globe, Building2, Users, DollarSign, MoreHorizontal } from "lucide-react";

const companies = [
  { id: "1", name: "Acme Corp", industry: "Technology", website: "acmecorp.com", size: "500-1000", contactCount: 8, dealCount: 3, revenue: 145000, tags: ["Enterprise"] },
  { id: "2", name: "TechStart", industry: "SaaS", website: "techstart.io", size: "50-100", contactCount: 4, dealCount: 1, revenue: 12000, tags: ["Startup"] },
  { id: "3", name: "GlobalCo", industry: "Manufacturing", website: "globalco.com", size: "1000+", contactCount: 12, dealCount: 5, revenue: 320000, tags: ["Enterprise", "VIP"] },
  { id: "4", name: "RetailPro", industry: "Retail", website: "retailpro.com", size: "200-500", contactCount: 6, dealCount: 2, revenue: 67000, tags: ["Mid-Market"] },
  { id: "5", name: "DataFlow AI", industry: "AI/ML", website: "dataflow.ai", size: "100-200", contactCount: 5, dealCount: 2, revenue: 89000, tags: ["AI/ML"] },
  { id: "6", name: "FinEdge", industry: "Finance", website: "finedge.com", size: "300-500", contactCount: 7, dealCount: 2, revenue: 112000, tags: ["Finance"] },
];

export default function CompaniesPage() {
  const [search, setSearch] = useState("");

  const filtered = companies.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.industry.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">{companies.length} companies</p>
        </div>
        <Button size="sm" className="gap-2 rounded-xl">
          <Plus className="h-4 w-4" />
          Add Company
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((company) => (
          <Card key={company.id} className="hover:card-shadow-hover transition-all duration-300 cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
                    <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{company.industry}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {company.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-muted/50 p-2">
                  <Users className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs font-semibold">{company.contactCount}</p>
                  <p className="text-[10px] text-muted-foreground">Contacts</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <DollarSign className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs font-semibold">{company.dealCount}</p>
                  <p className="text-[10px] text-muted-foreground">Deals</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <Globe className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs font-semibold">{formatCurrency(company.revenue)}</p>
                  <p className="text-[10px] text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
