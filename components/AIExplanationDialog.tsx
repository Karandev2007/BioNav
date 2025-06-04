import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface AIExplanationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  explanation: string;
  isLoading: boolean;
}

export default function AIExplanationDialog({
  isOpen,
  onClose,
  topic,
  explanation,
  isLoading,
}: AIExplanationDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-background p-6 shadow-lg z-50 border">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold">
              AI Explanation: {topic}
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-1.5 hover:bg-accent transition-colors">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                {explanation.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 