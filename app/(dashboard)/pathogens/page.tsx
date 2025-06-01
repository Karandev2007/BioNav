"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import pathogens from "@/data/pathogens.json";

export default function PathogensPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const filteredPathogens = pathogens.pathogens.filter((pathogen) => {
    const matchesSearch = 
      pathogen.name.toLowerCase().includes(search.toLowerCase()) ||
      pathogen.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "all" || pathogen.type.toLowerCase() === type.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Pathogens Explorer 🔬</h2>
          <p className="text-muted-foreground">
            Learn about different disease-causing organisms
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search pathogens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border bg-card px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="bacteria">Bacteria</option>
            <option value="virus">Virus</option>
            <option value="parasite">Parasite</option>
            <option value="fungus">Fungus</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPathogens.map((pathogen) => (
          <div
            key={pathogen.id}
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