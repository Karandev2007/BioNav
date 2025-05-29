"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Home",
    icon: "🏠",
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Dictionary",
    icon: "📚",
    href: "/dictionary",
    color: "text-violet-500",
  },
  {
    label: "Pathogens",
    icon: "🦠",
    href: "/pathogens",
    color: "text-pink-700",
  },
  {
    label: "Flashcards",
    icon: "🧠",
    href: "/flashcards",
    color: "text-orange-700",
  },
  {
    label: "AI Chat",
    icon: "🤖",
    href: "/chat",
    color: "text-emerald-500",
  },
  {
    label: "Profile",
    icon: "👤",
    href: "/profile",
    color: "text-gray-500",
  },
  {
    label: "Settings",
    icon: "⚙️",
    href: "/settings",
    color: "text-gray-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col space-y-4 bg-card py-4">
      <div className="px-3 py-2">
        <Link href="/dashboard" className="flex items-center gap-2 pl-3">
          <span className="text-2xl">🧬</span>
          <h1 className="text-xl font-bold text-primary">BioNav</h1>
        </Link>
      </div>
      <div className="flex-1 space-y-1 px-3">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === route.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <span className="text-xl">{route.icon}</span>
            {route.label}
          </Link>
        ))}
      </div>
      <div className="px-3 py-2">
        <footer className="text-center text-xs text-muted-foreground">
          Made with ❤️ by Karan
        </footer>
      </div>
    </div>
  );
} 