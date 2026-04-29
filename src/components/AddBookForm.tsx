import { Plus } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';

interface AddBookFormProps {
  onAdd: (title: string) => Promise<void>;
}

export const AddBookForm = ({ onAdd }: AddBookFormProps) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');

      const form = e.currentTarget;
      const formData = new FormData(form);
      const title = (formData.get('title') as string).trim();
      
      if (!title) {
        setError('Book title cannot be empty');
        inputRef.current?.focus();
        return;
      }

      if (title.length > 200) {
        setError('Book title must be less than 200 characters');
        return;
      }

      // Debounce to prevent rapid submissions
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setIsLoading(true);
      try {
        await onAdd(title);
        form.reset();
        setError('');
        inputRef.current?.focus();
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to add book. Please try again.';
        setError(errorMsg);
        console.error('Form submission error:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [onAdd]
  );

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="add-book-form">
        <input 
          ref={inputRef}
          name="title" 
          placeholder="What are you reading next?" 
          className="form-input"
          disabled={isLoading}
          maxLength={200}
          aria-label="Book title"
        />
        <button 
          type="submit" 
          className="btn-primary p-2 rounded-xl"
          disabled={isLoading}
          title="Add book"
        >
          <Plus size={20} />
        </button>
      </form>
      {error && (
        <p className="form-error">{error}</p>
      )}
    </div>
  );
};