import React, { useState } from 'react';
import type { Book } from '../services/bookService';
import { BookmarkContext } from './BookmarkContextObject';
import type { CustomBookNote } from './BookmarkContextObject';

// Komponen provider yang bungkus aplikasi supaya semua halaman bisa akses state global
export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State global untuk simpan daftar buku dari API yang ditandai favorit (daftar buku yang tersimpan)
  const [bookmarks, setBookmarks] = useState<Book[]>([]);
  
  // State global untuk simpan catatan bacaan manual dari formulir
  const [customNotes, setCustomNotes] = useState<CustomBookNote[]>([
    {
      id: 101,
      title: 'Dunia Anna',
      author: 'Jostein Gaarder',
      category: 'Fiksi',
      note: 'Bacaan yang ringan tapi ngena banget pesannya soal menjaga bumi buat generasi nanti.',
    },
  ]);

  // Fungsi tambah atau hapus buku dari daftar buku tersimpan
  const toggleBookmark = (book: Book) => {
    setBookmarks((prev) =>
      prev.some((b) => b.id === book.id)
        ? prev.filter((b) => b.id !== book.id)
        : [...prev, book]
    );
  };

  // Fungsi cek apakah suatu buku sudah ditandai favorit atau simpan
  const isBookmarked = (id: number) => bookmarks.some((b) => b.id === id);

  // Fungsi tambah catatan bacaan baru dari form
  const addCustomNote = (noteData: Omit<CustomBookNote, 'id'>) => {
    setCustomNotes((prev) => [{ id: Date.now(), ...noteData }, ...prev]);
  };

  // Fungsi hapus catatan bacaan berdasarkan ID
  const removeCustomNote = (id: number) => {
    setCustomNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        customNotes,
        toggleBookmark,
        isBookmarked,
        addCustomNote,
        removeCustomNote,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};