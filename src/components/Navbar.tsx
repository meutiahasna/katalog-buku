import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks';

// Reusable Component: navigasi utama aplikasi dengan Local State untuk menu responsif
export const Navbar: React.FC = () => {
  // Local State: atur kondisi buka/tutup menu navigasi di layar mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ambil jumlah koleksi (daftar buku tersimpan) & catatan dari Global State (Context API) untuk ditampilkan di badge menu
  const { bookmarks, customNotes } = useBookmarks();
  const totalSaved = bookmarks.length + customNotes.length;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="brand-title">
          Katalog Buku
        </NavLink>
        <span className="brand-author">Sumber Data: Gutendex Open API</span>
      </div>

      {/* Tombol untuk membuka/menutup menu di tampilan HP */}
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? '✕ Tutup' : '☰ Menu'}
      </button>

      {/* Daftar link navigasi antarmenu tanpa reload halaman penuh */}
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setIsMenuOpen(false)}
          end
        >
          Katalog Buku
        </NavLink>
        <NavLink
          to="/koleksi"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setIsMenuOpen(false)}
        >
          Buku Tersimpan & Catatan ({totalSaved})
        </NavLink>
      </div>
    </nav>
  );
};