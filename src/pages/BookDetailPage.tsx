import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { fetchBookById } from '../services/bookService';
import type { Book } from '../services/bookService';
import { useBookmarks } from '../hooks/useBookmarks';
import { FeedbackState } from '../components/FeedbackState';

// Halaman 2 - halaman Detail Buku pake Dynamic Route (/book/:id)
export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  // Ambil data buku langsung kalau diklik dari kartu (agar instan tanpa loading)
  const initialBook = (location.state as { book?: Book })?.book || null;

  const [book, setBook] = useState<Book | null>(initialBook);
  const [loading, setLoading] = useState<boolean>(!initialBook);
  const [error, setError] = useState<string | null>(null);

  const { toggleBookmark, isBookmarked } = useBookmarks();

  // Ambil detail buku dari API kalau halaman dibuka langsung via URL
  useEffect(() => {
    if (!id) return;
    if (initialBook && initialBook.id.toString() === id) return;

    let isMounted = true;

    const loadBookDetail = async () => {
      try {
        const data = await fetchBookById(id);
        if (isMounted) {
          setBook(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Gagal memuat detail buku.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    Promise.resolve().then(() => {
      if (isMounted) {
        setLoading(true);
        setError(null);
      }
      loadBookDetail();
    });

    return () => {
      isMounted = false;
    };
  }, [id, initialBook]);

  if (loading) return <FeedbackState type="loading" message="Memuat detail informasi buku..." />;
  if (error || !book) return <FeedbackState type="error" message={error || 'Buku tidak ditemukan.'} />;

  const saved = isBookmarked(book.id);
  const coverImage =
    book.formats['image/jpeg'] ||
    'https://placehold.co' + '/300x420/e2e8f0/475569?text=Sampul+Tidak+Tersedia';


  return (
    <div className="page-content">
      <Link to="/" className="back-link">
        ← Kembali ke Katalog Buku
      </Link>

      <div className="detail-card">
        <div className="detail-cover">
          <img src={coverImage} alt={book.title} />
        </div>

        <div className="detail-info">
          <span className="detail-badge">ID Buku: #{book.id}</span>
          <h1>{book.title}</h1>

          <div className="detail-meta">
            <p>
              <strong>Penulis:</strong>{' '}
              {book.authors.length > 0
                ? book.authors
                    .map(
                      (a) =>
                        `${a.name}${a.birth_year ? ` (${a.birth_year}–${a.death_year || '?'})` : ''}`
                    )
                    .join(', ')
                : 'Tidak Diketahui'}
            </p>
            <p>
              <strong>Bahasa:</strong> {book.languages.join(', ').toUpperCase()}
            </p>
            <p>
              <strong>Total Unduhan:</strong> {book.download_count.toLocaleString('id-ID')} kali
            </p>
          </div>

          {book.summaries && book.summaries.length > 0 && (
            <div className="detail-summary" style={{ marginTop: '1rem', lineHeight: '1.6', color: '#334155' }}>
              <strong>Sinopsis / Ringkasan Buku:</strong>
              <p style={{ marginTop: '0.35rem' }}>{book.summaries[0]}</p>
            </div>
          )}

          <div className="detail-subjects">
            <strong>Tag Buku:</strong>
            <ul>
              {book.subjects.length > 0 ? (
                book.subjects.map((subj, idx) => <li key={idx}>{subj}</li>)
              ) : (
                <li>Tidak ada tag buku</li>
              )}
            </ul>
          </div>

          <div className="detail-actions">
            <button
              onClick={() => toggleBookmark(book)}
              className={`btn-bookmark large ${saved ? 'saved' : ''}`}
            >
              {saved ? '★ Tersimpan di Daftar' : '☆ Simpan ke Daftar'}
            </button>

            {book.formats['text/html'] && (
              <a
                href={book.formats['text/html']}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Baca Online (Gutenberg) ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
