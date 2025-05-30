import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">Coming Soon! 🚀</h1>
      <p className="mb-8 text-center text-muted-foreground">
        We&apos;re working hard to bring you this feature. Stay tuned!
      </p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
} 