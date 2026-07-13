import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="mx-auto max-w-3xl flex items-center h-16 px-6">
          <Link href="/">
            <Logo size="sm" />
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p><strong>Last updated:</strong> July 12, 2026</p>
          <p>Pipeline CRM (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the Pipeline CRM platform. This page informs you of our policies regarding the collection, use, and disclosure of personal information.</p>
          <h2 className="text-xl font-semibold text-foreground">Information Collection</h2>
          <p>We collect information you provide directly, including name, email, company details, and contact information for your CRM records. We also collect usage data to improve our service.</p>
          <h2 className="text-xl font-semibold text-foreground">Data Usage</h2>
          <p>We use collected information to provide and maintain our service, notify you about changes, provide customer support, and gather analytics to improve the platform.</p>
          <h2 className="text-xl font-semibold text-foreground">Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at <Link href="/contact" className="text-primary hover:underline">our contact page</Link>.</p>
        </div>
      </main>
    </div>
  );
}
