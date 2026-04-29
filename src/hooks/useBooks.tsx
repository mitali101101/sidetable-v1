import { useState, useMemo, useEffect } from 'react';
import type { Book, Category } from '../types';
import { CATEGORY_SEQUENCE } from '../constants';

import { db } from '../lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp, where } from 'firebase/firestore';
import { type User } from 'firebase/auth';


export type BookActions = ReturnType<typeof useBooks>['actions'];

export const useBooks = (user: User | null) => {
  
  const [books, setBooks] = useState<Book[]>([]);
  const [reviewingBook, setReviewingBook] = useState<Book | null>(null);
  const [tempReview, setTempReview] = useState('');
  const [tempRating, setTempRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Start as true

  // Listen to Firestore changes
  useEffect(() => {
    if (!user) {
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true); // Set loading when user changes

    const q = query(
      collection(db, 'books'),
      where("userId", "==", user.uid), // Only your books
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      })) as Book[];
      setBooks(docs);
      setLoading(false); // Data is here!
    });

    return () => unsubscribe();
  }, [user]);

  // OPTIMIZATION: Filter books by category once per render
  const booksByCategory = useMemo(() => {
    // We reduce the main array into a "Map" of categories
    return books.reduce((acc, book) => {
      if (!acc[book.category]) acc[book.category] = [];
      acc[book.category].push(book);
      return acc;
    }, {} as Record<Category, Book[]>);
  }, [books]);

  // --- ACTIONS API ---
  const actions = {

    addBook: async (title: string) => {
      if (!user) {
        setError('You must be logged in to add a book');
        return;
      }
      try {
        setError(null);
        await addDoc(collection(db, 'books'), {
          title,
          userId: user.uid,
          category: 'wishlist',
          rating: 0,
          review: '',
          createdAt: serverTimestamp()
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to add book. Please try again.';
        setError(message);
        console.error('Add book error:', err);
      }
    },

    moveForward: async (id: string) => {
      try {
        setError(null);
        const book = books.find(b => b.id === id);
        if (!book) {
          setError('Book not found');
          return;
        }

        if (book.category === 'reading') {
          setReviewingBook(book);
          setTempReview(book.review || '');
          setTempRating(book.rating || 0);
        } else {
          await updateCategory(id, 'forward');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to move book. Please try again.';
        setError(message);
        console.error('Move forward error:', err);
      }
    },

    moveBackward: async (id: string) => {
      try {
        setError(null);
        await updateCategory(id, 'backward');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to move book. Please try again.';
        setError(message);
        console.error('Move backward error:', err);
      }
    },

    reorderCategory: (category: Category, newOrder: Book[]) => {
      try {
        setError(null);
        setBooks(prev => [
          ...newOrder,
          ...prev.filter(b => b.category !== category)
        ]);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to reorder books. Please try again.';
        setError(message);
        console.error('Reorder error:', err);
      }
    },

    updateReview: (text: string) => setTempReview(text),
    updateRating: (rating: number) => setTempRating(rating),

    submitReview: async (isSkip: boolean = false) => {
      if (!reviewingBook) {
        setError('No book selected for review');
        return;
      }
      
      try {
        setError(null);
        const bookDoc = doc(db, 'books', reviewingBook.id);
        await updateDoc(bookDoc, {
          category: 'finished' as Category,
          review: isSkip ? '' : tempReview,
          rating: isSkip ? 0 : tempRating
        });

        setReviewingBook(null);
        setTempReview('');
        setTempRating(0);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save review. Please try again.';
        setError(message);
        console.error('Submit review error:', err);
      }
    },

    editReview: (id: string) => {
      try {
        setError(null);
        const book = books.find(b => b.id === id);
        if (book) {
          setReviewingBook(book);
          setTempReview(book.review || '');
          setTempRating(book.rating || 0);
        } else {
          setError('Book not found');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to edit review. Please try again.';
        setError(message);
        console.error('Edit review error:', err);
      }
    },

    closeReviewModal: () => {
      setReviewingBook(null);
      setTempReview('');
      setTempRating(0);
      setError(null);
    },

    deleteBook: async (id: string) => {
      try {
        setError(null);
        await deleteDoc(doc(db, 'books', id));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete book. Please try again.';
        setError(message);
        console.error('Delete book error:', err);
      }
    },

    clearError: () => setError(null)
  };

  async function updateCategory(id: string, dir: 'forward' | 'backward') {
    const book = books.find(b => b.id === id);
    if (!book) return;

    const currentIndex = CATEGORY_SEQUENCE.indexOf(book.category);
    const nextIndex = dir === 'forward' ? currentIndex + 1 : currentIndex - 1;
    const nextCategory = CATEGORY_SEQUENCE[nextIndex];

    if (nextCategory) {
      await updateDoc(doc(db, 'books', id), { category: nextCategory });
    }
  }

  return { books, booksByCategory, reviewingBook, tempReview, tempRating, error, actions, loading};
};
