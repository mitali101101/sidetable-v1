import { ArrowRight, ArrowLeft, Trash2, MessageSquare } from 'lucide-react';

interface BookActionButtonsProps {
  isFinished: boolean;
  onMoveForward?: () => void;
  onMoveBackward?: () => void;
  onDelete: () => void;
  onEditReview?: () => void;
}

export const BookActionButtons = ({
  isFinished,
  onMoveForward,
  onMoveBackward,
  onDelete,
  onEditReview
}: BookActionButtonsProps) => {
  return (
    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
      <button 
        onClick={onDelete}
        className="action-btn hover:bg-red-50 text-red-300"
        title="Delete book"
      >
        <Trash2 size={14} />          
      </button>
      
      {/* Backward Navigation */}
      {onMoveBackward && (
        <button 
          onClick={onMoveBackward} 
          className="action-btn hover:bg-stone-100 text-stone-400"
          title="Move back"
        >
          <ArrowLeft size={14} />
        </button>
      )}
      
      {/* Forward Navigation */}
      {onMoveForward && (
        <button 
          onClick={onMoveForward} 
          className="action-btn hover:bg-stone-100 text-amber-600"
          title="Move forward"
        >
          <ArrowRight size={14} />
        </button>
      )}

      {/* Edit Review (only shown on finished books) */}
      {isFinished && onEditReview && (
        <button 
          onClick={onEditReview} 
          className="action-btn hover:bg-amber-50 text-amber-600"
          title="Edit review"
        >
          <MessageSquare size={14} /> 
        </button>
      )}
    </div>
  );
};
