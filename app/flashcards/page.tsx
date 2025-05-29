"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import terms from "@/data/biology-terms.json";

type Flashcard = {
  id: string;
  front: string;
  back: string;
};

const createFlashcardsFromTerms = (): Flashcard[] => {
  return terms.terms.map(term => ({
    id: term.id,
    front: term.term,
    back: term.definition
  }));
};

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const flashcards = createFlashcardsFromTerms();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <div className="mx-auto max-w-4xl space-y-4 p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Flashcards</h2>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div 
              className="w-full max-w-lg aspect-[3/2] perspective-1000"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* front of card */}
                <div className="absolute w-full h-full backface-hidden rounded-xl border bg-card p-6 flex items-center justify-center">
                  <h3 className="text-2xl font-semibold text-center">
                    {flashcards[currentIndex].front}
                  </h3>
                </div>

                {/* back of card */}
                <div className="absolute w-full h-full backface-hidden rounded-xl border bg-card p-6 flex items-center justify-center rotate-y-180">
                  <p className="text-lg text-center">
                    {flashcards[currentIndex].back}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                Previous
              </button>
              <div className="px-4 py-2">
                {currentIndex + 1} / {flashcards.length}
              </div>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
} 

