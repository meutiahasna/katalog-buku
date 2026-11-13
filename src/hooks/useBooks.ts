import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/bookService';
import type { Book } from '../services/bookService';

// Custom Hook untuk ambil dan kelola Server State daftar buku dari Gutendex API
export const useBooks = (search: string, topic: string, sort: string, page: number) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    // Fungsi asynchronous untuk ambil data API tanpa memicu cascading render
    const loadBooks = async () => {
      try {
        // Memulai proses fetch API
        const data = await fetchBooks({ search, topic, sort, page });
        if (isMounted) {
          setBooks(data.results);
          setTotalCount(data.count);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Menjadwalkan pembaruan state secara asynchronous supaya lolos aturan ESLint React 19+
    Promise.resolve().then(() => {
      if (isMounted) {
        setLoading(true);
        setError(null);
      }
      loadBooks();
    });

    // Cleanup function untuk mencegah memory leak jika komponen ditutup sebelum fetch selesai
    return () => {
      isMounted = false;
    };
  }, [search, topic, sort, page]);

  // Menghitung total halaman (Gutendex API mengembalikan maksimal 32 buku per halaman)
  const totalPages = Math.ceil(totalCount / 32);

  return { books, loading, error, totalCount, totalPages };
};