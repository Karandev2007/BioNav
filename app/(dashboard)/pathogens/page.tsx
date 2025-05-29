import { Search } from "lucide-react";

const pathogens = [
  {
    name: "Escherichia coli",
    type: "Bacteria",
    description: "Food poisoning, UTIs",
    emoji: "🦠",
    color: "bg-red-500/10 text-red-500",
  },
  {
    name: "Influenza A",
    type: "Virus",
    description: "Respiratory infection",
    emoji: "🦠",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    name: "Plasmodium falciparum",
    type: "Parasite",
    description: "Malaria",
    emoji: "🦟",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    name: "Candida albicans",
    type: "Fungus",
    description: "Yeast infections",
    emoji: "🍄",
    color: "bg-green-500/10 text-green-500",
  },
  {
    name: "SARS-CoV-2",
    type: "Virus",
    description: "COVID-19",
    emoji: "🦠",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "Staphylococcus aureus",
    type: "Bacteria",
    description: "Skin infections",
    emoji: "🦠",
    color: "bg-orange-500/10 text-orange-500",
  },
];

export default function PathogensPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Pathogens Explorer 🔬</h2>
          <p className="text-muted-foreground">
            Learn about different disease-causing organisms
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search pathogens..."
            className="w-full rounded-lg border bg-card px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pathogens.map((pathogen) => (
          <div
            key={pathogen.name}
            className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:border-primary"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-4xl">{pathogen.emoji}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${pathogen.color}`}>
                {pathogen.type}
              </span>
            </div>
            <h3 className="mb-2 font-semibold">{pathogen.name}</h3>
            <p className="text-sm text-muted-foreground">{pathogen.description}</p>
          </div>
        ))}
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        Made with ❤️ by Karan
      </footer>
    </div>
  );
} 