import axios from 'axios';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export interface InsertBookSchema {
  title: string;
  author: string;
  year: number;
  status: string;
  owner: string;
  language: string;
  bookType: string;
  genre: string;
  location: string;
}

async function insertBook(bookData: InsertBookSchema): Promise<void> {
  await axios.post(`/api/books/insert`, bookData);
}

export function useInsertBooks(): UseMutationResult<void, Error, InsertBookSchema, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertBook,
    onSuccess: (_, insertedBook) => {
      // Invalidate all book queries to refetch
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book inserted successfully');
      console.log('Book inserted successfully:', insertedBook);
    },
    onError: (error) => {
      toast.error('Failed to insert book');
      console.error('Error inserting book:', error);
    },
  });
}
