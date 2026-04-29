import { X, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ErrorToastProps {
  message: string | null;
  onDismiss: () => void;
  autoCloseDuration?: number;
}

export const ErrorToast = ({ message, onDismiss, autoCloseDuration = 5000 }: ErrorToastProps) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, autoCloseDuration);

    return () => clearTimeout(timer);
  }, [message, onDismiss, autoCloseDuration]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 max-w-sm z-50 animate-in slide-in-from-bottom-5">
      <div className="error-toast">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 hover:bg-red-100 rounded transition-colors"
            aria-label="Close error"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
