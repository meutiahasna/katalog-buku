import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './context/BookmarkContext';
import { MainLayout } from './pages/MainLayout';
import { HomePage } from './pages/HomePage';
import { BookDetailPage } from './pages/BookDetailPage';
import { CollectionPage } from './pages/CollectionPage';
import './App.css';

export function App() {
  return (
    // Membungkus semua aplikasi dengan BookmarkProvider supaya Global State bisa diakses semua halaman
    <BookmarkProvider>
      {/* Atur basename sesuai path sub-folder deployment di website pribadi */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Nested Route: mainLayout sebagai kerangka utama (Navbar + Footer) */}
          <Route path="/" element={<MainLayout />}>
            {/* Halaman 1 (Index): Katalog Buku Utama */}
            <Route index element={<HomePage />} />

            {/* Halaman 2 (Dynamic Route): Detail Buku berdasarkan ID */}
            <Route path="book/:id" element={<BookDetailPage />} />

            {/* Halaman 3: Koleksi Favorit & Form Catatan Buku */}
            <Route path="koleksi" element={<CollectionPage />} />

            {/* Halaman 404: Jika URL tidak ditemukan */}
            <Route
              path="*"
              element={
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <h2>404 - Halaman Tidak Ditemukan</h2>
                  <p style={{ marginTop: '0.5rem', color: '#64748b' }}>
                    Alamat halaman yang dituju tidak tersedia di katalog ini.
                  </p>
                </div>
              }
            />

          </Route>
        </Routes>
      </BrowserRouter>
    </BookmarkProvider>
  );
}

export default App;