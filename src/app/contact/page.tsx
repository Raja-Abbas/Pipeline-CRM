import { Logo } from "@/components/ui/logo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
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
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">Get in touch with our team</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 text-center">
              <Mail className="h-6 w-6 mx-auto text-emerald-600 dark:text-emerald-400 mb-3" />
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-muted-foreground">support@pipelinecrm.com</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <MapPin className="h-6 w-6 mx-auto text-emerald-600 dark:text-emerald-400 mb-3" />
              <p className="text-sm font-medium">Office</p>
              <p className="text-xs text-muted-foreground">San Francisco, CA</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <Clock className="h-6 w-6 mx-auto text-emerald-600 dark:text-emerald-400 mb-3" />
              <p className="text-sm font-medium">Hours</p>
              <p className="text-xs text-muted-foreground">Mon-Fri 9am-6pm PST</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
