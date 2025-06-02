"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  return (
    <div className="relative min-h-screen">
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <MobileNav />
      <main className="md:pl-72">
        {children}
      </main>
    </div>
  );
} 