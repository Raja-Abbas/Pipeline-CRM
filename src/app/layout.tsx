import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pipeline CRM — Sales Pipeline & CRM Platform",
    template: "%s | Pipeline CRM",
  },
  description:
    "Multi-tenant CRM and sales pipeline platform for agencies and sales teams. Track leads, manage deals, and close more with Kanban pipeline views.",
  keywords: [
    "CRM",
    "sales pipeline",
    "deal tracking",
    "Kanban",
    "lead management",
    "SaaS",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Pipeline CRM",
    description:
      "Multi-tenant CRM and sales pipeline platform for agencies and sales teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "12px",
                background: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
                fontSize: "14px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
