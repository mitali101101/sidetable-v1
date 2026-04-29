import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// This function lets us write: cn("base-class", isRed && "text-red-500")
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}