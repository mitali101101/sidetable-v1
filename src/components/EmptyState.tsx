//ToDo : Move CSS code to a separate file and clean up classNames

import { BookPlus, Library } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-stone-200 rounded-3xl bg-stone-50/50">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-stone-400">
        <Library size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-stone-900 mb-1">Your shelf is empty</h3>
      <p className="text-stone-500 text-sm max-w-[240px] mb-6">
        Start your collection by adding a book you're planning to read!
      </p>
      <div className="flex items-center gap-2 text-amber-600 text-sm font-medium animate-pulse">
        <BookPlus size={18} />
        <span>Use the input above to add a book</span>
      </div>
    </div>
  );
};