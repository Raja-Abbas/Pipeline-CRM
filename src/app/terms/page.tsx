import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p><strong>Last updated:</strong> July 12, 2026</p>
          <p>By accessing Pipeline CRM, you agree to be bound by these Terms of Service. If you disagree with any part, you may not access the service.</p>
          <h2 className="text-xl font-semibold text-foreground">Service Usage</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          <h2 className="text-xl font-semibold text-foreground">Data Ownership</h2>
          <p>You retain all rights to the data you input into Pipeline CRM. We will not sell, share, or use your CRM data for any purpose other than providing you the service.</p>
          <h2 className="text-xl font-semibold text-foreground">Termination</h2>
          <p>We may terminate or suspend your account at our discretion, without prior notice, for conduct that violates these Terms or is harmful to other users.</p>
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>Questions about these Terms? Contact us at <Link href="/contact" className="text-primary hover:underline">our contact page</Link>.</p>
        </div>
      </main>
    </div>
  );
}
