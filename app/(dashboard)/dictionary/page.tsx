"use client";

import { useState } from "react";
import terms from "@/data/biology-terms.json";
import AIExplanationDialog from "@/components/AIExplanationDialog";
import PathogenInfoDialog from "@/components/PathogenInfoDialog";
import { Sparkles, Info } from "lucide-react";
import { toast } from "sonner";

export default function DictionaryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPathogenDialogOpen, setIsPathogenDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [pathogenInfo, setPathogenInfo] = useState<{ symptoms?: string; causes?: string; treatments?: string; }>({});
  const [isLoading, setIsLoading] = useState(false);

  const filteredTerms = terms.terms.filter((term) => {
    const matchesSearch = term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || term.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleGetAIExplanation = async (topic: string) => {
    setSelectedTopic(topic);
    setIsDialogOpen(true);
    setIsLoading(true);
    setExplanation("");

    try {
      const response = await fetch("/api/ai-explanation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error: ${response.status}`);
      }

      setExplanation(data.explanation);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate explanation";
      console.error("Error getting AI explanation:", errorMessage);
      toast.error(errorMessage);
      setExplanation("An error occurred while generating the explanation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetPathogenInfo = async (pathogen: string) => {
    setSelectedTopic(pathogen);
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
    <div className="container mx-auto max-w-4xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Biology Dictionary 📚</h2>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="all">All Categories</option>
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredTerms.map((term) => (
          <div key={term.id} className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{term.term}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                term.category === "Basic" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
              }`}>
                {term.category}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{term.definition}</p>
            <div className="mt-3 flex gap-2">
              {term.related.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-3">
              <button
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleGetAIExplanation(term.term)}
                disabled={isLoading}
              >
                <Sparkles className="h-4 w-4" />
                {isLoading ? "Generating..." : "Get AI Explanation"}
              </button>
              {term.category === "Pathogen" && (
                <button
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleGetPathogenInfo(term.term)}
                  disabled={isLoading}
                >
                  <Info className="h-4 w-4" />
                  {isLoading ? "Loading..." : "Learn More"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <AIExplanationDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setExplanation("");
        }}
        topic={selectedTopic}
        explanation={explanation}
        isLoading={isLoading}
      />

      <PathogenInfoDialog
        isOpen={isPathogenDialogOpen}
        onClose={() => {
          setIsPathogenDialogOpen(false);
          setPathogenInfo({});
        }}
        pathogenName={selectedTopic}
        info={pathogenInfo}
        isLoading={isLoading}
      />
    </div>
  );
} 