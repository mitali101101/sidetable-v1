//ToDo : Move CSS code to a separate file and clean up classNames

export const LoadingSkeleton = ({ type }: { type: 'full' | 'shelf' }) => {
  if (type === 'full') {
    return (
      <div className="h-screen flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <div className="h-6 w-32 bg-stone-200 rounded" /> {/* Category Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-32 bg-stone-200 rounded-2xl" /> {/* Book Card */}
            <div className="h-32 bg-stone-200 rounded-2xl" />
          </div>
        </div>
      ))}
    </div>
  );
};