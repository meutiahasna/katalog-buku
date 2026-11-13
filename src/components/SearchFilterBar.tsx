import React, { useState } from 'react';

interface SearchFilterBarProps {
  search: string;
  topic: string;
  sort: string;
  onSearchSubmit: (newSearch: string) => void;
  onTopicChange: (newTopic: string) => void;
  onSortChange: (newSort: string) => void;
}

// Reusable Component: bar kontrol pencarian, filter kategori, dan pengurutan data
export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  search,
  topic,
  sort,
  onSearchSubmit,
  onTopicChange,
  onSortChange,
}) => {
  // Local state sementara untuk input ketikan sebelum tombol Cari ditekan
  const [inputValue, setInputValue] = useState(search);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(inputValue.trim());
  };

  return (
    <section className="filter-bar">
      {/* Form Search berdasarkan kata kunci judul/penulis */}
      <form onSubmit={handleFormSubmit} className="search-form">
        <input
          type="text"
          placeholder="Cari judul buku atau nama penulis (contoh: Dickens, Sherlock)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn-primary">
          Cari
        </button>
        {search && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setInputValue('');
              onSearchSubmit('');
            }}
          >
            Reset
          </button>
        )}
      </form>

      {/* Kontrol filter Kategori & Sorting */}
      <div className="filter-controls">
        <div className="control-group">
          <label htmlFor="topic-select">Kategori:</label>
          <select
            id="topic-select"
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            className="select-input"
          >
            <option value="">Semua Kategori</option>
            <option value="fiction">Fiksi (Fiction)</option>
            <option value="science">Sains (Science)</option>
            <option value="history">Sejarah (History)</option>
            <option value="philosophy">Filsafat (Philosophy)</option>
            <option value="adventure">Petualangan (Adventure)</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort-select">Urutkan:</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="select-input"
          >
            <option value="popular">Paling Populer</option>
            <option value="ascending">Katalog Terlama (ID Kecil → Besar)</option>
            <option value="descending">Katalog Terbaru (ID Besar → Kecil)</option>
          </select>
        </div>
      </div>
    </section>
  );
};