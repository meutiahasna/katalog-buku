import React from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '../services/bookService';
import { useBookmarks } from '../hooks/useBookmarks';

interface BookCardProps {
  book: Book;
}

// Reusable Component: kartu buku untuk menampilkan ringkasan 1 buku di katalog atau koleksi (daftar buku tersimpan)
export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const saved = isBookmarked(book.id);

  // Ambil URL gambar sampul dari API, atau pake placeholder kalau tidak tersedia
  const coverImage =
  book.formats['image/jpeg'] ||
  'https://placehold.co' + '/300x420/e2e8f0/475569?text=Sampul+Tidak+Tersedia';

  // Gabungkan nama penulis (atau 'Anonim' kalau array authors kosong)
  const authorNames =
    book.authors.length > 0
      ? book.authors.map((a) => a.name).join(', ')
      : 'Penulis Tidak Diketahui';

  return (
    <article className="book-card">
      <div className="book-cover-wrapper">
        <img src={coverImage} alt={book.title} className="book-cover" loading="lazy" />
        <span className="book-lang">{book.languages.join(', ').toUpperCase()}</span>
      </div>

      <div className="book-info">
        <h3 className="book-title" title={book.title}>
          {book.title}
        </h3>
        <p className="book-author">{authorNames}</p>
        <p className="book-downloads">⬇ {book.download_count.toLocaleString('id-ID')} unduhan</p>
      </div>

      <div className="book-actions">
        {/* Navigasi ke Dynamic Route detail buku berdasarkan ID */}
        <Link to={`/book/${book.id}`} state={{ book }} className="btn-detail">
            Detail Buku
        </Link>

        {/* Tombol untuk menyimpan/menghapus buku ke Global State (Context API) */}
        <button
          onClick={() => toggleBookmark(book)}
          className={`btn-bookmark ${saved ? 'saved' : ''}`}
          title={saved ? 'Hapus dari Koleksi' : 'Simpan ke Koleksi'}
        >
          {saved ? '★ Tersimpan' : '☆ Simpan'}
        </button>
      </div>
    </article>
  );
};