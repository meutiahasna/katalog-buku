export interface Author {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export interface Book {
  id: number;
  title: string;
  authors: Author[];
  summaries?: string[];
  subjects: string[];
  languages: string[];
  download_count: number;
  formats: {
    'image/jpeg'?: string;
    'text/html'?: string;
  };
}

export interface BooksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

const BASE_URL = 'https://gutendex.com/books';

export const fetchBooks = async (params: {
  search?: string;
  topic?: string;
  sort?: string;
  page?: number;
}): Promise<BooksResponse> => {
  const url = new URL(BASE_URL);
  if (params.search) url.searchParams.append('search', params.search);
  if (params.topic) url.searchParams.append('topic', params.topic);
  if (params.sort) url.searchParams.append('sort', params.sort);
  if (params.page && params.page > 1) url.searchParams.append('page', params.page.toString());

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Gagal mengambil daftar buku dari server.');
  }
  return response.json();
};

export const fetchBookById = async (id: string): Promise<Book> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Detail buku tidak ditemukan.');
  }
  return response.json();
};
