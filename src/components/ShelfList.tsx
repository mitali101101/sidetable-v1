import { SHELF_CONFIG } from '../constants';
import { ShelfColumn } from './ShelfColumn';
import type { Book, Category } from '../types';
import type { BookActions } from "../hooks/useBooks";

interface ShelfListProps {
  booksByCategory: Record<Category, Book[]>;
  actions: BookActions; 
}

export const ShelfList = ({ booksByCategory, actions }: ShelfListProps) => {
  return (
    <main className="main-grid">
      {SHELF_CONFIG.map(({ id, label, icon: Icon }) => (
        <ShelfColumn
          key={id}
          id={id}
          label={label}
          icon={<Icon size={14} />}
          books={booksByCategory[id] || []}
          actions={actions}
        />
      ))}
    </main> 
  );
};