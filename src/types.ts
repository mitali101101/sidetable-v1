export type Category = 'wishlist' | 'reading' | 'finished';

export interface Book {
  id: string;
  userId: string; 
  title: string;
  category: Category;
  review?: string;
  rating?: number; // 1-5
  createdAt?: any; // Firestore serverTimestamp
}