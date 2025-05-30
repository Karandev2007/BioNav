import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | BioNav",
  description: "Your Biology Learning Dashboard",
};

const features = [
  {
    name: "Dictionary",
    description: "Look up biology terms and concepts",
    icon: "📚",
    href: "/dictionary",
  },
  {
    name: "Pathogens",
    description: "Explore different disease-causing organisms",
    icon: "🦠",
    href: "/pathogens",
  },
  {
    name: "Flashcards",
    description: "Create and study flashcards",
    icon: "🧠",
    href: "/flashcards",
  },
  {
    name: "AI Chat",
    description: "Get help from our AI tutor",
    icon: "🤖",
    href: "/chat",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome Back! 👋</h2>
        <p className="text-muted-foreground">
          Continue your biology learning journey
        </p>
      </div>

      {/* quick access */}
      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <a
            key={feature.name}
            href={feature.href}
            className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
          >
            <div className="mb-4 text-4xl">{feature.icon}</div>
            <h3 className="mb-2 font-semibold">{feature.name}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
} 