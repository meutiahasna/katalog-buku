import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

// Reusable Component: navigasi perpindahan halaman (Pagination)
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // tidak tampilkan pagination kalau hanya ada 1 halaman atau kosong
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="btn-page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Sebelumnya
      </button>

      <span className="page-info">
        Halaman <strong>{currentPage}</strong> dari <strong>{totalPages.toLocaleString('id-ID')}</strong>
      </span>

      <button
        className="btn-page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Selanjutnya →
      </button>
    </div>
  );
};