import { Reorder } from "framer-motion";
import { Shelf } from './Shelf';
import { BookCard } from './BookCard';
import type { Book, Category } from '../types';
import type { BookActions } from '../hooks/useBooks';

interface ShelfColumnProps {
  id: Category;
  label: string;
  icon: React.ReactNode;
  books: Book[];
  actions: BookActions;
}

export const ShelfColumn = ({ id, label, icon, books, actions }: ShelfColumnProps) => {
  const handleMoveForward = (bookId: string) => actions.moveForward(bookId);
  const handleMoveBackward = (bookId: string) => actions.moveBackward(bookId);
  const handleDelete = (bookId: string) => actions.deleteBook(bookId);
  const handleEditReview = (bookId: string) => actions.editReview(bookId);

  return (
    <Shelf title={label} category={id} icon={icon}>
      <Reorder.Group 
        axis="y" 
        values={books || []}
        onReorder={(newOrder) => actions.reorderCategory(id, newOrder)}
        className="space-y-3"
      >
        {(books || []).map(book => (
          <Reorder.Item key={book.id} value={book}>
            <BookCard 
              book={book} 
              onMoveForward={id !== 'finished' ? () => handleMoveForward(book.id) : undefined}
              onMoveBackward={id !== 'wishlist' ? () => handleMoveBackward(book.id) : undefined}
              onDelete={() => handleDelete(book.id)}
              onEditReview={() => handleEditReview(book.id)}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </Shelf>
  );
};
