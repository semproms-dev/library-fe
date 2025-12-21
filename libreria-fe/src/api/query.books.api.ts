import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export interface Book {
  BookId: number;
  Title: string;
  Author: string;
  Year: number;
  BookType: string;
  Genre: string;
  Owner: string;
  Status: string;
  Location: string;
  Language: string;
}

const BookSchema = z.object({
  BookId: z.number(),
  Title: z.string(),
  Author: z.string(),
  Year: z.number(),
  BookType: z.string(),
  Genre: z.string(),
  Owner: z.string(),
  Status: z.string(),
  Location: z.string(),
  Language: z.string(),
});

export interface Form {
  title: string;
  author: string;
  year: number;
  bookType: string;
  genre: string;
  owner: string;
  status: string;
  location: string;
  language: string;
}

const BookArraySchema = z.array(BookSchema);

export interface BooksResponse {
  data: Book[];
  total?: number;
  totalPages?: number;
}

const BooksResponseSchema = z
  .object({
    data: BookArraySchema,
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      total: z.number(),
      totalPages: z.number(),
    }),
  })
  .or(BookArraySchema);

async function fetchBooks(form: Form, currentPage: number): Promise<BooksResponse> {
  const filtered = Object.fromEntries(Object.entries(form).filter(([, v]) => v != ''));
  const res = await axios.post(`/api/books/`, {
    filters: filtered,
    page: currentPage,
    pageSize: 10,
  });

  // Check if response has pagination metadata or is just an array
  const parsed = BooksResponseSchema.safeParse(res.data);
  
  if (parsed.success) {
    if (Array.isArray(parsed.data)) {
      // Backend returns just an array (no pagination metadata)
      return { data: parsed.data };
    } else {
      // Backend returns object with metadata: { data: [...], pagination: {...} }
      return {
        data: parsed.data.data,
        total: parsed.data.pagination.total,
        totalPages: parsed.data.pagination.totalPages,
      };
    }
  }

  // Fallback: assume it's an array
  return { data: BookArraySchema.parse(res.data) };
}

export function useBooks(form: Form, currentPage: number) {
  return useQuery<BooksResponse>({
    queryKey: ['books', form, currentPage] as const,
    queryFn: () => fetchBooks(form, currentPage),
    enabled: Boolean(form),
  });
}
