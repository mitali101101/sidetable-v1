import { Bookmark, BookOpen, CheckCircle } from 'lucide-react';
import type { Category } from './types';

export const CATEGORY_SEQUENCE: Category[] = ['wishlist', 'reading', 'finished'];

export const SHELF_CONFIG = [
  { id: 'wishlist', label: 'Wishlist', icon: Bookmark },
  { id: 'reading', label: 'Reading', icon: BookOpen },
  { id: 'finished', label: 'Finished', icon: CheckCircle },
] as const;