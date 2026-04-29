import { ReviewModal } from './components/ReviewModal';
import { useBooks } from './hooks/useBooks';
import { Header } from './components/Header';
import { AddBookForm } from './components/AddBookForm';
import { ShelfList } from './components/ShelfList';
import { ErrorToast } from './components/ErrorToast';

import { LoginView } from './components/LoginView';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { EmptyState } from './components/EmptyState';
import { useAuth } from './hooks/useAuth';

export default function App() {
  
  const { user, login, loginGuest, logout, loading : authLoading } = useAuth();
  const { 
    books, booksByCategory, reviewingBook, tempReview, tempRating, error, actions, loading : booksLoading
  } = useBooks(user);
  
  if (authLoading) return <LoadingSkeleton type="full" />;
  if (!user) return <LoginView onLogin={login} onGuestLogin={loginGuest} />;


return (
    <div className="app-container">
      
      <Header user={user} onLogout={logout} />

      <AddBookForm onAdd={actions.addBook} /> 

      {
        booksLoading ? (
          <LoadingSkeleton type="shelf" />
        ) : books.length === 0 ? (
          <EmptyState />
        ) : (
          <ShelfList 
            booksByCategory={booksByCategory} 
            actions={actions} 
          />
        )
      }

      {reviewingBook && ( 
        <ReviewModal 
          book={reviewingBook}
          tempReview={tempReview}
          tempRating={tempRating}
          onUpdateReview={actions.updateReview}
          onUpdateRating={actions.updateRating}
          onSave={() => actions.submitReview(false)}
          onSkip={() => actions.submitReview(true)}
          onClose={actions.closeReviewModal}
        />
      )}

      {/* Error Toast Notification */}
      <ErrorToast 
        message={error} 
        onDismiss={actions.clearError}
      />
    </div>
  );
}

