import type { Book } from '../types';
import { Star, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect } from 'react';

interface ReviewModalProps {
  book: Book;
  tempReview: string;
  tempRating: number;
  onUpdateReview: (text: string) => void;  
  onUpdateRating: (rating: number) => void;
  onSave: () => void;
  onSkip: () => void;
  onClose: () => void;
}

export const ReviewModal = ({ 
  book, 
  tempReview, 
  tempRating, 
  onUpdateReview, 
  onUpdateRating, 
  onSave, 
  onSkip, 
  onClose 
}: ReviewModalProps) => {
  // ESC key to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          title="Close (ESC)"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <h3 className="modal-title">Finish "{book?.title || 'Book'}"</h3>
        <p className="modal-subtitle">Capture a final thought for your shelf.</p>
        
        {/* Star Rating Component */}
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onUpdateRating(star)}
              className={cn(
                "star-button",
                star <= tempRating ? "star-filled" : "star-empty"
              )}
              title={`Rate ${star} star${star !== 1 ? 's' : ''}`}
            >
              <Star size={28} fill={star <= tempRating ? "currentColor" : "none"} />
            </button>
          ))}
        </div>

        <textarea 
          autoFocus
          className="form-textarea mb-6"
          placeholder="What did you learn?..."
          value={tempReview}
          onChange={(e) => onUpdateReview(e.target.value)}
        />
        
        <div className="flex gap-3">
          <button 
            onClick={onSkip} 
            className="btn-ghost"
            title="Skip writing a review"
          >
            Skip
          </button>
          <button 
            onClick={onSave} 
            className="btn-primary"
            title="Save review and finish book"
          >
            Save & Finish
          </button>
        </div>
      </div>
    </div>
  );
};