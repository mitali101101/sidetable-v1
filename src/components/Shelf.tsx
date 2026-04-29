import type { ReactNode } from 'react';
import type { Category } from '../types';
import { cn } from '../lib/utils';

interface ShelfProps {
  title: string;
  icon: ReactNode;
  category: Category;
  children: ReactNode;
}

const shelfVariants = {
  wishlist: "border-dashed border-stone-200 bg-transparent",
  reading: "bg-amber-50/30 border-amber-100/50 shadow-inner",
  finished: "bg-stone-100/40 border-stone-200/60"
};

export const Shelf = ({ title, icon, category, children }: ShelfProps) => {

  return (
    <section className="shelf-container">
      <h2 className="shelf-title">
        {icon} {title}
      </h2>
      <div className={cn(
        "shelf-box",
        shelfVariants[category]
      )}>        
        {children}
      </div>
    </section>
  );
};