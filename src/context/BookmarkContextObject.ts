import { createContext } from 'react';
import type { Book } from '../services/bookService';

// Struktur data untuk catatan bacaan lokal yang dibuat pengguna
export interface CustomBookNote {
  id: number;
  title: string;
  author: string;
  category: string;
  note: string;
}

// Struktur fungsi dan state yang dibagikan secara global via Context
export interface BookmarkContextType {
  bookmarks: Book[];
  customNotes: CustomBookNote[];
  toggleBookmark: (book: Book) => void;
  isBookmarked: (id: number) => boolean;
  addCustomNote: (noteData: Omit<CustomBookNote, 'id'>) => void;
  removeCustomNote: (id: number) => void;
}

// Buat wadah Context global
export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);