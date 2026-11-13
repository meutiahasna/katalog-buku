import React, { useState } from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { BookCard } from '../components/BookCard';
import { FeedbackState } from '../components/FeedbackState';

// Halaman 3: Daftar buku tersimpan & formulir catatan bacaan dengan Validasi Input
export const CollectionPage: React.FC = () => {
  const { bookmarks, customNotes, addCustomNote, removeCustomNote } = useBookmarks();

  // Form State: Controlled components untuk setiap field input
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Fiksi');
  const [note, setNote] = useState('');

  // State untuk menyimpan pesan error validasi formulir
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    author?: string;
    note?: string;
  }>({});
  const [successMsg, setSuccessMsg] = useState('');

  // Fungsi validasi input sebelum formulir dikirim
  const validateForm = () => {
    const errors: { title?: string; author?: string; note?: string } = {};

    if (!title.trim()) {
      errors.title = 'Judul buku wajib diisi.';
    } else if (title.trim().length < 3) {
      errors.title = 'Judul buku minimal 3 karakter.';
    }

    if (!author.trim()) {
      errors.author = 'Nama penulis wajib diisi.';
    }

    if (!note.trim()) {
      errors.note = 'Catatan singkat wajib diisi.';
    } else if (note.trim().length < 10) {
      errors.note = 'Catatan minimal 10 karakter';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handler saat form dikirim
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');

    if (!validateForm()) return;

    addCustomNote({
      title: title.trim(),
      author: author.trim(),
      category,
      note: note.trim(),
    });

    // Reset input formulir setelah berhasil disimpan
    setTitle('');
    setAuthor('');
    setCategory('Fiksi');
    setNote('');
    setFormErrors({});
    setSuccessMsg('Catatan bacaan berhasil ditambahkan ke daftar!');
  };

  return (
    <div className="page-content">
      <header className="page-header">
        <h1>Buku Tersimpan & Catatan Bacaan</h1>
        <p>Kelola buku yang disimpan dari katalog maupun catatan bacaan pribadi</p>
      </header>

      {/* Formulir Interaktif dengan Validasi */}
      <section className="form-section">
        <h2> Tambah Catatan Bacaan</h2>
        {successMsg && <div className="alert-success">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="note-form" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="book-title">Judul Buku *</label>
              <input
                id="book-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Hyouka #2"
                className={formErrors.title ? 'input-error' : ''}
              />
              {formErrors.title && <span className="error-text">{formErrors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="book-author">Nama Penulis *</label>
              <input
                id="book-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Contoh: Yonezawa Honobu"
                className={formErrors.author ? 'input-error' : ''}
              />
              {formErrors.author && <span className="error-text">{formErrors.author}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="book-category">Kategori</label>
              <select
                id="book-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Fiksi">Fiksi</option>
                <option value="Filsafat">Filsafat</option>
                <option value="Sains & Teknologi">Sains & Teknologi</option>
                <option value="Sejarah">Sejarah</option>
                <option value="Non-Fiksi">Non-Fiksi</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="book-note">Catatan Singkat (min. 10 karakter) *</label>
            <textarea
              id="book-note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tuliskan kutipan favorit, ringkasan bab, atau ulasan singkat mengenai buku ini..."
              className={formErrors.note ? 'input-error' : ''}
            />
            {formErrors.note && <span className="error-text">{formErrors.note}</span>}
          </div>

          <button type="submit" className="btn-primary">
            Simpan Catatan Bacaan
          </button>
        </form>
      </section>

      {/* Daftar Catatan Bacaan Pribadi */}
      <section className="collection-section">
        <h2>Catatan Bacaan Pribadi ({customNotes.length})</h2>
        {customNotes.length === 0 ? (
          <FeedbackState type="empty" message="Belum ada catatan bacaan yang ditambahkan." />
        ) : (
          <div className="notes-grid">
            {customNotes.map((item) => (
              <div key={item.id} className="note-card">
                <div className="note-header">
                  <span className="note-category">{item.category}</span>
                  <button
                    onClick={() => removeCustomNote(item.id)}
                    className="btn-delete-small"
                    title="Hapus Catatan"
                  >
                    Hapus
                  </button>
                </div>
                <h3>{item.title}</h3>
                <p className="note-author">Oleh: {item.author}</p>
                <p className="note-body">"{item.note}"</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Daftar buku favorit yang disimpan dari Katalog API */}
      <section className="collection-section">
        <h2>Daftar Buku Tersimpan ({bookmarks.length})</h2>
        {bookmarks.length === 0 ? (
          <FeedbackState
            type="empty"
            message="Belum ada buku dari katalog yang disimpan. Klik tombol '☆ Simpan' pada kartu buku di halaman utama."
          />
        ) : (
          <div className="book-grid">
            {bookmarks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};