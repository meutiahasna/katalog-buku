import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { BookCard } from '../components/BookCard';
import { Pagination } from '../components/Pagination';
import { FeedbackState } from '../components/FeedbackState';

// Halaman 1: Katalog Buku Utama yang memanfaatkan URL State dan Server State
export const HomePage: React.FC = () => {
  // URL State: Simpan parameter search, topic, sort, dan page langsung di URL query string
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const topic = searchParams.get('topic') || '';
  const sort = searchParams.get('sort') || 'popular';
  const page = Number(searchParams.get('page')) || 1;

  // Server State: Ambil data buku, status loading, error, dan total halaman lewat Custom Hook
  const { books, loading, error, totalCount, totalPages } = useBooks(search, topic, sort, page);

  // Helper untuk perbarui URL State secara rapi tanpa menghilangkan parameter lain
  const updateUrlParams = (updates: Record<string, string>) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        nextParams.set(key, value);
      } else {
        nextParams.delete(key);
      }
    });
    setSearchParams(nextParams);
  };

  // Handler saat kata kunci pencarian dikirim (reset halaman ke 1)
  const handleSearchSubmit = (newSearch: string) => {
    updateUrlParams({ search: newSearch, page: '1' });
  };

  // Handler saat filter kategori diubah (reset halaman ke 1)
  const handleTopicChange = (newTopic: string) => {
    updateUrlParams({ topic: newTopic, page: '1' });
  };

  // Handler saat opsi pengurutan diubah (reset halaman ke 1)
  const handleSortChange = (newSort: string) => {
    updateUrlParams({ sort: newSort, page: '1' });
  };

  // Handler saat tombol pagination diklik
  const handlePageChange = (newPage: number) => {
    updateUrlParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-content">
      <header className="page-header">
        <h1>Katalog Buku Digital</h1>
        <p>Telusuri daftar buku, penulis, dan kategori bacaan secara lengkap.</p>
      </header>

      {/* Komponen Search, Filter, dan Sorting */}
      <SearchFilterBar
        search={search}
        topic={topic}
        sort={sort}
        onSearchSubmit={handleSearchSubmit}
        onTopicChange={handleTopicChange}
        onSortChange={handleSortChange}
      />

      {/* Menampilkan informasi jumlah hasil kalau tidak sedang loading/error */}
      {!loading && !error && books.length > 0 && (
        <p className="results-summary">
          Menampilkan hasil ke-{((page - 1) * 32 + 1).toLocaleString('id-ID')} –{' '}
          {Math.min(page * 32, totalCount).toLocaleString('id-ID')} dari total{' '}
          <strong>{totalCount.toLocaleString('id-ID')}</strong> buku
        </p>
      )}

      {/* Penanganan 3 kondisi tampilan data: Loading, Error, Empty State, atau Daftar Buku */}
      {loading ? (
        <FeedbackState type="loading" />
      ) : error ? (
        <FeedbackState type="error" message={error} />
      ) : books.length === 0 ? (
        <FeedbackState type="empty" />
      ) : (
        <>
          <div className="book-grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};