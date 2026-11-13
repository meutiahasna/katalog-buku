import React from 'react';

interface FeedbackStateProps {
  type: 'loading' | 'error' | 'empty';
  message?: string;
}

// Reusable Component: tampilan terpusat untuk indikator Loading, Error, dan Empty State
export const FeedbackState: React.FC<FeedbackStateProps> = ({ type, message }) => {
  if (type === 'loading') {
    return (
      <div className="feedback-box loading">
        <div className="spinner"></div>
        <p>{message || 'Sedang memuat data buku dari server...'}</p>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="feedback-box error">
        <p className="feedback-icon">⚠️</p>
        <p>{message || 'Terjadi kesalahan saat mengambil data dari API'}</p>
      </div>
    );
  }

  return (
    <div className="feedback-box empty">
      <p>{message || 'Tidak ada buku yang ditemukan sesuai kriteria pencarian'}</p>
    </div>
  );
};