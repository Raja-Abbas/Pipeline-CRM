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
    "Prisma",
    "Tailwind CSS",
  ],
  authors: [{ name: "Pipeline CRM" }],
  creator: "Pipeline CRM",
  metadataBase: new URL("https://pipeline-crm-next.netlify.app"),
  openGraph: {
    title: "Pipeline CRM — Close More Deals",
    description:
      "Multi-tenant CRM and sales pipeline platform for agencies and sales teams. Drag-and-drop Kanban, analytics, and real-time sync.",
    url: "https://pipeline-crm-next.netlify.app",
    siteName: "Pipeline CRM",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Pipeline CRM — Sales Pipeline Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pipeline CRM — Close More Deals",
    description:
      "Multi-tenant CRM and sales pipeline platform for agencies and sales teams.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
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
