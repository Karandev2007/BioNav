"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Monitor, Sparkles } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* background layers */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 z-0">
            <ParticlesBackground />
          </div>
          {/* gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/50 to-background/95 backdrop-blur-[8px] z-[1]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,159,133,0.15),transparent)] z-[2]" />
        </div>

        {/* content */}
        <div className="container relative z-10 px-4 mx-auto mt-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            
            <div className="relative">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 animate-fade-in-up">
                Your Biology Learning
                <br />
                Journey Starts Here
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-400/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Explore biology concepts, study pathogens, create flashcards, and chat with our AI tutor.
            </p>

            <div className="flex justify-center items-center gap-6 animate-fade-in-up animation-delay-400">
              <a
                href="https://accounts.bionav.qeintech.in/sign-in"
                className="group relative inline-flex items-center gap-2 rounded-full bg-primary/90 px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary hover:shadow-[0_0_30px_rgba(14,159,133,0.3)] hover:scale-105"
              >
                <span className="relative z-10">Try BioNav</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              </a>
            </div>

            <p className="text-sm text-gray-500/80 animate-fade-in-up animation-delay-600">
              Made with ❤️ by Karan
            </p>
          </div>
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