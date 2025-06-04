"use client";

import { useState } from "react";
import terms from "@/data/biology-terms.json";
import AIExplanationDialog from "@/components/AIExplanationDialog";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function DictionaryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [explanation, setExplanation] = useState("");
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
    setExplanation(""); // Clear previous explanation

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
      // keep the dialog open to show the error message
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
            <button
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleGetAIExplanation(term.term)}
              disabled={isLoading}
            >
              <Sparkles className="h-4 w-4" />
              {isLoading ? "Generating..." : "Get AI Explanation"}
            </button>
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
    </div>
  );
} 