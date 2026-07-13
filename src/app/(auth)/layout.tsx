import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <Logo size="md" />
          </div>
          {children}
        </div>
      </div>

      {/* Right panel - branded feature panel */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 overflow-hidden noise-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-6 leading-tight">
            Close more deals<br />with Pipeline CRM
          </h2>
          <p className="text-emerald-100 text-lg mb-10 leading-relaxed max-w-md">
            Manage your sales pipeline, track leads, and never miss a follow-up.
            Built for teams that move fast.
          </p>

          <div className="space-y-4">
            {[
              { num: "3x", label: "Faster deal closure" },
              { num: "89%", label: "Team adoption rate" },
              { num: "$2.4M", label: "Revenue tracked monthly" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <span className="text-2xl font-bold text-white">{stat.num}</span>
                <span className="text-emerald-200">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full" />
      </div>
    </div>
  );
}
