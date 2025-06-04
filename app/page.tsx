"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Monitor, Sparkles } from "lucide-react";

const features = [
  {
    title: "AI Dictionary",
    icon: "🧬",
    description: "Quick access to biology terms with AI-powered explanations",
  },
  {
    title: "Flashcards",
    icon: "🧠",
    description: "Create and study digital flashcards for effective learning",
  },
  {
    title: "Pathogen Search",
    icon: "🔍",
    description: "Explore and understand different disease-causing organisms",
  },
  {
    title: "AI Assistant",
    icon: "🤖",
    description: "Get instant help with biology concepts and questions",
  },
  {
    title: "Visual Insights",
    icon: "📊",
    description: "Interactive visualizations for complex topics (Coming Soon)",
  },
  {
    title: "Study Groups",
    icon: "👥",
    description: "Collaborate with peers in virtual study rooms (Coming Soon)",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl rounded-2xl border bg-background/60 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 transition-transform hover:scale-110">
              <Image
                src="/logo.png"
                alt="BioNav Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-primary">BioNav</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#tools" className="text-sm font-medium transition-colors hover:text-primary">
              Tools
            </Link>
            <Link href="#join" className="text-sm font-medium transition-colors hover:text-primary">
              Join
            </Link>
          </nav>
          <a
            href="https://accounts.bionav.qeintech.in/sign-in"
            className="group rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:scale-105"
          >
            Try BioNav
            <ArrowRight className="ml-2 inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </header>

      {/* hero section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background/90">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent pb-2">
            Your Biology Learning Journey Starts Here
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore biology concepts, study pathogens, create flashcards, and chat with our AI tutor.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="https://accounts.bionav.qeintech.in/sign-in"
              className="group inline-flex items-center gap-2 rounded-full bg-primary/90 px-6 py-3 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:scale-105"
            >
              Try BioNav
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Made with ❤️ by Karan
          </p>
        </div>
      </section>

      {/* features section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">Features</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card/30 backdrop-blur-sm p-6 transition-all hover:border-primary hover:shadow-lg hover:scale-105"
              >
                <span className="text-4xl group-hover:animate-bounce">{feature.icon}</span>
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* preview section */}
      <section id="tools" className="py-16 bg-accent/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">See BioNav in Action</h2>
          <div className="mt-12">
            <div className="mx-auto max-w-5xl rounded-xl border bg-background/50 backdrop-blur-sm p-4 shadow-2xl transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-2 border-b pb-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center text-sm text-muted-foreground">
                  BioNav Dashboard
                </div>
              </div>
              <div className="relative aspect-[16/9] mt-4">
                <Image
                  src="/logo.png"
                  alt="BioNav Dashboard Preview"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* join section */}
      <section id="join" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm p-8 shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Join BioNav Today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Start your journey towards better biology learning with our AI-powered tools.
            </p>
            <a
              href="https://accounts.bionav.qeintech.in/sign-in"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:scale-105"
            >
              Get Started
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold">About</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 transition-transform hover:scale-110">
                  <Image
                    src="/logo.png"
                    alt="BioNav Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-primary">BioNav</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Navigate biology with confidence
              </p>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Copyright © 2025 BioNav
            </p>
            <p className="mt-2 text-sm font-bold text-primary">
              Made with ❤️ by Karan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}