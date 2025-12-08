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

async function fetchBooks(form: Form) {
  const res = await axios.post(`/api/books/`, form);
  debugger;

  return BookArraySchema.parse(res.data);
}

export function useBooks(form: Form) {
  return useQuery<Book[]>({
    queryKey: ['books', form] as const,
    queryFn: () => fetchBooks(form),
    enabled: Boolean(form),
  });
}
