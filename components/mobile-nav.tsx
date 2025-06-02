"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
  }
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      {/* mobile menu button */}
      <button
        onClick={toggleMenu}
        className="fixed right-4 top-4 z-50 rounded-full bg-primary p-2 text-primary-foreground"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}

      {/* mobile menu */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-3/4 transform bg-card p-6 shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={toggleMenu}>
            <div className="relative h-8 w-8">
              <Image
                src="/logo.png"
                alt="BioNav Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-primary">BioNav</h1>
          </Link>
        </div>

        {/* nav links */}
        <nav className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={toggleMenu}
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
          <SignOutButton>
            <Link 
              href="/"
              className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={toggleMenu}
            >
              <span className="text-xl">🚪</span>
              Logout
            </Link>
          </SignOutButton>
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-6">
          <footer className="text-center text-xs text-muted-foreground">
            Made with ❤️ by Karan
          </footer>
        </div>
      </div>
    </div>
  );
} 