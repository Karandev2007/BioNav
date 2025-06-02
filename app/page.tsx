"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="fixed inset-0 flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative isolate px-6">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffea] to-[#8aff80] opacity-10"
          />
        </div>

        {/* content */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex flex-col items-center gap-4">
            <div className="relative h-16 w-16">
              <Image
                src="/logo.png"
                alt="BioNav Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="inline-flex rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border/10 hover:ring-border/20">
              Welcome to BioNav
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Your Biology Learning Journey Starts Here
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Explore biology concepts, study pathogens, create flashcards, and chat with our AI tutor.
          </p>
          
          {/* login button */}
          <div className="mt-10">
            <a
              href="https://accounts.bionav.qeintech.in/sign-in"
              className="rounded-md bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Login to Get Started
            </a>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        Made with ❤️ by Karan
      </footer>
    </div>
  );
}