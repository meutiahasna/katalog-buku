import { useContext } from 'react';
import { BookmarkContext } from '../context/BookmarkContextObject';

// Custom Hook untuk mempermudah komponen lain mengakses data & fungsi dari BookmarkContext
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks harus digunakan di dalam BookmarkProvider');
  }
  return context;
};