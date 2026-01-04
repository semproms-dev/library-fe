import axios from 'axios';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { BooksResponse } from './query.books.api';

export interface UpdateBookSchema {
  bookId: number;
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

async function updateBook(bookData: UpdateBookSchema): Promise<void> {
  const { bookId, ...updateData } = bookData;
  await axios.put(`/api/books/modify/${bookId}`, updateData);
}

export function useUpdateBooks(): UseMutationResult<void, Error, UpdateBookSchema, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBook,
    onSuccess: (_, updatedBook) => {
      // Manually update all book queries in cache with the updated book data
      queryClient.setQueriesData<BooksResponse>(
        { queryKey: ['books'] },
        (oldData) => {
          if (!oldData) return oldData;
          
          // Find and update the book in the data array
          const updatedData = oldData.data.map((book) => {
            if (book.BookId === updatedBook.bookId) {
              return {
                ...book,
                Title: updatedBook.title,
                Author: updatedBook.author,
                Year: updatedBook.year,
                Status: updatedBook.status,
                Owner: updatedBook.owner,
                Language: updatedBook.language,
                BookType: updatedBook.bookType,
                Genre: updatedBook.genre,
                Location: updatedBook.location,
              };
            }
            return book;
          });

          return {
            ...oldData,
            data: updatedData,
          };
        },
      );

      // Invalidate to mark queries as stale and trigger background refetch
      queryClient.invalidateQueries({ queryKey: ['books'] });
      
      toast.success('Book updated successfully');
      console.log('Book updated successfully:', updatedBook);
    },
    onError: (error) => {
      toast.error('Failed to update book');
      console.error('Error updating book:', error);
    },
  });
}
