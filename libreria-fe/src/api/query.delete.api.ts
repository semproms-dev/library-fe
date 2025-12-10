import axios from 'axios';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';

async function deleteBooks(id: string | number): Promise<void> {
  await axios.delete(`/api/books/delete/${id}`);
}

export function useDeleteBooks(): UseMutationResult<void, Error, string | number, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBooks,
    onSuccess: (_, deletedId) => {
      // Invalidate all book queries to refetch
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book deleted successfully');
      console.log('Book deleted successfully:', deletedId);
    },
    onError: (error) => {
      toast.error('Failed to delete book');
      console.error('Error deleting book:', error);
    },
  });
}
