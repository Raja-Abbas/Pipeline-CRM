import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GitBranch,
  Users,
  Building2,
  CheckSquare,
  BarChart3,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Star,
} from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Visual Pipeline",
    description: "Drag-and-drop Kanban boards to move deals through your custom pipeline stages.",
  },
  {
    icon: Users,
    title: "Contact Management",
    description: "Centralized contact database with company associations and activity history.",
  },
  {
    icon: Building2,
    title: "Company Profiles",
    description: "Track organizations, industries, and relationships across your entire portfolio.",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description: "Priority-based task tracking with due dates, assignments, and deal linking.",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description: "Revenue charts, pipeline health, win rates, and performance dashboards.",
  },
  {
    icon: Zap,
    title: "Activity Timeline",
    description: "Automatic logging of calls, emails, meetings, and notes across all deals.",
  },
];

const steps = [
  { num: "01", title: "Add your contacts", description: "Import or manually add leads, contacts, and companies." },
  { num: "02", title: "Build your pipeline", description: "Customize stages to match your sales process." },
  { num: "03", title: "Track every deal", description: "Move deals forward and never miss a follow-up." },
  { num: "04", title: "Close more deals", description: "Use analytics to optimize your conversion rate." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 glass">
        <div className="mx-auto max-w-6xl flex items-center justify-between h-16 px-6">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button size="sm" className="rounded-xl">Launch Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden noise-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-6">
            <Star className="h-3.5 w-3.5" />
            Built for modern sales teams
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
            Close more deals<br />
            <span className="gradient-text">with Pipeline CRM</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A multi-tenant CRM and sales pipeline platform for agencies and sales teams.
            Track leads, manage deals, and never miss a follow-up.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-xl text-base px-8 gap-2">
                Launch Dashboard Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> SOC 2 compliant
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> Multi-tenant
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> Real-time sync
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Everything you need to close deals
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A complete CRM toolkit designed to streamline your sales process from first contact to closed deal.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:card-shadow-hover transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="rounded-xl bg-emerald-100 dark:bg-emerald-500/10 p-3 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 border-t bg-muted/30 noise-bg">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Up and running in minutes
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Get started with Pipeline CRM in four simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <span className="text-5xl font-bold text-emerald-500/10 absolute -top-4 -left-2">{step.num}</span>
                <div className="relative pt-8">
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-24 border-t">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: "2,500+", label: "Sales teams" },
              { value: "$48M+", label: "Deals tracked" },
              { value: "34%", label: "Avg win rate" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-xl text-muted-foreground italic leading-relaxed">
              &ldquo;Pipeline CRM transformed our sales process. We closed 40% more deals in the first quarter
              after switching. The pipeline view alone is worth it.&rdquo;
            </p>
            <footer className="mt-4">
              <p className="font-semibold">Sarah Chen</p>
              <p className="text-sm text-muted-foreground">VP Sales, Acme Corp</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Ready to close more deals?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Start tracking your pipeline and boosting your conversion rate today.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="rounded-xl text-base px-8 gap-2">
              Launch Dashboard Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" showText={false} />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Pipeline CRM. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
