import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export interface Book {
  bookId: number;
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

const BookSchema = z.object({
  bookId: z.number(),
  title: z.string(),
  author: z.string(),
  year: z.number(),
  bookType: z.string(),
  genre: z.string(),
  owner: z.string(),
  status: z.string(),
  location: z.string(),
  language: z.string(),
});

const BookArraySchema = z.array(BookSchema);

async function fetchBooks(param: string, value: string) {
  const res = await axios.get(`/api/books/${param}/${value}`);
  return BookArraySchema.parse(res.data);
}

export function useBooks(param: string, value: string) {
  return useQuery<Book[]>({
    queryKey: ['books', param, value] as const,
    queryFn: () => fetchBooks(param, value),
    enabled: Boolean(param && value),
  });
}
