"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  return (
    <div className="relative h-screen">
      {/* mob nav */}
      <div className="fixed inset-y-0 z-50 flex h-[4.5rem] w-full items-center justify-between border-b bg-card px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧬</span>
          <h1 className="text-xl font-bold text-primary">BioNav</h1>
        </div>
        <SignOutButton>
          <button className="rounded-lg bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80">
            Logout
          </button>
        </SignOutButton>
      </div>

      {/* desk sidebar */}
      <div className="fixed inset-y-0 z-50 hidden w-72 border-r lg:block">
        <Sidebar />
      </div>

      {/* main conent */}
      <div className="lg:pl-72">
        <div className="h-[4.5rem] lg:hidden" />
        <main className="min-h-[calc(100vh-4.5rem)]">{children}</main>
      </div>
    </div>
  );
} 