"use client";

import { useState } from "react";
import { Search, Info } from "lucide-react";
import pathogens from "@/data/pathogens.json";
import PathogenInfoDialog from "@/components/PathogenInfoDialog";
import { toast } from "sonner";

export default function PathogensPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [isPathogenDialogOpen, setIsPathogenDialogOpen] = useState(false);
  const [selectedPathogen, setSelectedPathogen] = useState("");
  const [pathogenInfo, setPathogenInfo] = useState<{ symptoms?: string; causes?: string; treatments?: string; }>({});
  const [isLoading, setIsLoading] = useState(false);

  const filteredPathogens = pathogens.pathogens.filter((pathogen) => {
    const matchesSearch = 
      pathogen.name.toLowerCase().includes(search.toLowerCase()) ||
      pathogen.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "all" || pathogen.type.toLowerCase() === type.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleGetPathogenInfo = async (pathogen: string) => {
    setSelectedPathogen(pathogen);
    setIsPathogenDialogOpen(true);
    setIsLoading(true);
    setPathogenInfo({});

    try {
      const response = await fetch("/api/pathogen-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pathogen }),
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error: ${response.status}`);
      }

      setPathogenInfo(data.info);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to get pathogen information";
      console.error("Error getting pathogen info:", errorMessage);
      toast.error(errorMessage);
      setPathogenInfo({
        symptoms: "Error loading information. Please try again.",
        causes: "Error loading information. Please try again.",
        treatments: "Error loading information. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="mt-3">
              <button
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleGetPathogenInfo(pathogen.name)}
                disabled={isLoading}
              >
                <Info className="h-4 w-4" />
                {isLoading && selectedPathogen === pathogen.name ? "Loading..." : "Learn More"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <PathogenInfoDialog
        isOpen={isPathogenDialogOpen}
        onClose={() => {
          setIsPathogenDialogOpen(false);
          setPathogenInfo({});
        }}
        pathogenName={selectedPathogen}
        info={pathogenInfo}
        isLoading={isLoading}
      />

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        Made with ❤️ by Karan
      </footer>
    </div>
  );
} 