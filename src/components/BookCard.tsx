import type { Book } from '../types';
import { GripVertical, Star } from 'lucide-react';
import { BookActionButtons } from './BookActionButtons';

interface BookCardProps {
  book: Book;
  onMoveForward?: () => void;
  onMoveBackward?: () => void;
  onDelete: () => void;
  onEditReview?: () => void;
}

export const BookCard = ({ 
  book, 
  onMoveForward, 
  onMoveBackward, 
  onDelete, 
  onEditReview
}: BookCardProps) => {
  
  const isFinished = book.category === 'finished';

  return (
    <div className="book-card group">
      <div className="flex justify-between items-start">
        <div className="grip-handle">
          <GripVertical size={16} />
        </div>
        
        <div className="flex-1">
          <p className={isFinished ? 'book-title-finished' : 'book-title'}>
            {book?.title || 'Untitled'}
          </p>

          {/* Star Rating (only on finished books) */}
          {isFinished && book?.rating ? (
            <div className="book-meta">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={10} 
                  fill={i < (book.rating || 0) ? "currentColor" : "none"} 
                  className={i >= (book.rating || 0) ? "text-stone-200" : ""}
                />
              ))}
            </div>
          ) : null}
        </div>
        
        <BookActionButtons
          isFinished={isFinished}
          onMoveForward={onMoveForward}
          onMoveBackward={onMoveBackward}
          onDelete={onDelete}
          onEditReview={onEditReview}
        />
      </div>
      
      {/* Review Snippet (only on finished books with review) */}
      {isFinished && book?.review && (
        <p className="review-box">
          "{book.review}"
        </p>
      )}
    </div>
  );
};