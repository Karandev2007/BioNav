import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface PathogenInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pathogenName: string;
  info: {
    symptoms?: string;
    causes?: string;
    treatments?: string;
  };
  isLoading: boolean;
}

const formatText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index} className="text-primary">{boldText}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

export default function PathogenInfoDialog({
  isOpen,
  onClose,
  pathogenName,
  info,
  isLoading,
}: PathogenInfoDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-background p-6 shadow-lg z-50 border">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold">
              {pathogenName}
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-1.5 hover:bg-accent transition-colors">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {info.symptoms && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">Symptoms</h3>
                    <div className="prose prose-invert max-w-none">
                      {info.symptoms.split('\n').map((paragraph, index) => (
                        <p key={index}>{formatText(paragraph)}</p>
                      ))}
                    </div>
                  </div>
                )}
                {info.causes && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">Causes</h3>
                    <div className="prose prose-invert max-w-none">
                      {info.causes.split('\n').map((paragraph, index) => (
                        <p key={index}>{formatText(paragraph)}</p>
                      ))}
                    </div>
                  </div>
                )}
                {info.treatments && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">Treatments</h3>
                    <div className="prose prose-invert max-w-none">
                      {info.treatments.split('\n').map((paragraph, index) => (
                        <p key={index}>{formatText(paragraph)}</p>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 