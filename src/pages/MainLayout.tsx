import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

// Layout Utama yang menerapkan Nested Route melalui komponen <Outlet />
export const MainLayout: React.FC = () => {
  return (
    <div className="app-wrapper">
      {/* Navigasi tetap muncul di semua halaman anak */}
      <Navbar />

      {/* Area tempat halaman-halaman anak (HomePage, BookDetailPage, CollectionPage) dirender */}
      <main className="main-container">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>
          © 2026 Katalog Buku Digital - Gutendex API
        </p>
      </footer>
    </div>
  );
};