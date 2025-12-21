import type { ContextModalProps } from '@mantine/modals';
import { modals } from '@mantine/modals';
import {
  Table,
  Box,
  Text,
  Loader,
  Paper,
  Group,
  Badge,
  ActionIcon,
  Tooltip,
  Pagination,
} from '@mantine/core';
import React from 'react';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { type Form, useBooks, type BooksResponse } from '../api/query.books.api.ts';
import { BookDetail } from './BookDetail.tsx';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useDeleteBooks } from '../api/query.delete.api.ts';

// Tipos de datos que tu tabla mostrará
interface SearchItem {
  id: number;
  name: string;
  value: number;
}

interface Book {
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

interface SearchParams {
  status: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  owner: string;
  bookType: string;
  location: string;
  language: string;
  dateRange: string;
}

// Interfaz para los datos que pasan al modal
interface SearchModalInnerProps {
  data: SearchItem[];
  searchParams: SearchParams;
}

function exportToLibarianFormat(author: string): string {
  const parts = author.split(/\s+/);

  if (parts.length === 1) {
    return parts[0];
  }

  const surname = parts.pop();
  const givenNames = parts.join(' ');

  return `${surname}, ${givenNames}`;
}

// Tipado del componente de Mantine Modals
type SearchResultsModalProps = ContextModalProps<SearchModalInnerProps>;

const SearchResultsModal: React.FC<SearchResultsModalProps> = ({ innerProps }) => {
  const { searchParams } = innerProps;
  const queryClient = useQueryClient();
  const deleteBookMutation = useDeleteBooks();
  // Initialize with current theme state
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      const theme = document.documentElement.getAttribute('data-theme');
      return theme === 'Dark';
    }
    return false;
  });

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'Dark');
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const emptyBookState: Form = {
    title: searchParams.title || '',
    author: searchParams.author || '',
    // Use 0 as the default if year isn't found or convert the searchParam value to a number
    year: Number(searchParams.year) || 0,
    bookType: searchParams.bookType || '',
    genre: searchParams.genre || '',
    owner: searchParams.owner || '',
    status: searchParams.status || '',
    location: searchParams.location || '',
    language: searchParams.language || '',
  };
  const [page, setPage] = useState(1);
  const { data, isLoading } = useBooks(emptyBookState, page);

  const [openDetail, setOpenDetail] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Reset to page 1 when search params change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [
    searchParams.title,
    searchParams.author,
    searchParams.year,
    searchParams.bookType,
    searchParams.genre,
    searchParams.owner,
    searchParams.status,
    searchParams.location,
    searchParams.language,
  ]);

  if (isLoading) {
    return (
      <Box p="xl" style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader size="lg" color="blue" />
      </Box>
    );
  }

  const rows = data?.data?.map((element: Book) => (
    <Table.Tr
      onClick={() => {
        setSelectedBook(element);
        setOpenDetail(true);
      }}
      key={element.BookId}
    >
      <Table.Td
        style={{
          wordBreak: 'break-word',
          cursor: 'pointer',
        }}
        styles={() => ({
          td: {
            color: isDark ? '#e0e0e0' : '#1a1a1a',
          },
        })}
      >
        {element.Title}
      </Table.Td>
      <Table.Td
        style={{
          wordBreak: 'break-word',
          cursor: 'pointer',
        }}
        styles={() => ({
          td: {
            color: isDark ? '#e0e0e0' : '#1a1a1a',
          },
        })}
      >
        {exportToLibarianFormat(element.Author)}
      </Table.Td>
      <Table.Td
        style={{
          whiteSpace: 'nowrap',
          cursor: 'pointer',
        }}
        styles={() => ({
          td: {
            color: isDark ? '#e0e0e0' : '#1a1a1a',
          },
        })}
      >
        {element.Location}
      </Table.Td>
      <Table.Td
        style={{
          whiteSpace: 'nowrap',
          cursor: 'pointer',
        }}
        styles={() => ({
          td: {
            color: isDark ? '#e0e0e0' : '#1a1a1a',
          },
        })}
      >
        <Group gap="xs">
          <Tooltip label={'Edit book'}>
            <ActionIcon
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <IconEdit />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={'Remove book'}>
            <ActionIcon
              color={'red'}
              onClick={(e) => {
                e.stopPropagation();
                modals.openConfirmModal({
                  title: 'Delete book',
                  centered: true,
                  children: (
                    <Text size="sm">
                      Are you sure you want to delete &quot;{element.Title}&quot;? This action
                      cannot be undone.
                    </Text>
                  ),
                  labels: { confirm: 'Delete', cancel: 'Cancel' },
                  confirmProps: {
                    color: 'red',
                    variant: 'filled',
                    className: 'delete-confirm-button',
                    style: {
                      backgroundColor: '#fa5252',
                      borderColor: '#fa5252',
                    },
                    styles: {
                      root: {
                        backgroundColor: '#fa5252 !important',
                        borderColor: '#fa5252 !important',
                        '&:hover': {
                          backgroundColor: '#e03131 !important',
                          borderColor: '#e03131 !important',
                        },
                      },
                    },
                  },
                  cancelProps: { color: 'blue', variant: 'filled' },
                  onConfirm: async () => {
                    // Call the mutation with the book ID
                    await deleteBookMutation.mutateAsync(element.BookId);
                    // After deletion, update the cache manually instead of refetching
                    queryClient.setQueryData<BooksResponse>(
                      ['books', emptyBookState, page],
                      (oldData) => {
                        if (!oldData) return oldData;
                        const newData = oldData.data.filter(
                          (book) => book.BookId !== element.BookId,
                        );
                        return {
                          ...oldData,
                          data: newData,
                          total: oldData.total ? oldData.total - 1 : undefined,
                        };
                      },
                    );
                  },
                  onCancel: () => {
                    console.log('Delete cancelled');
                  },
                });
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const activeParams = Object.entries(searchParams).filter(
    ([, v]) => v !== '' && v !== 0 && v != null,
  );

  return (
    <Box p="md">
      {activeParams.length > 0 && (
        <Paper
          p="md"
          withBorder
          style={{
            backgroundColor: 'var(--mantine-color-gray-0)',
          }}
        >
          <Text
            size="sm"
            fw={500}
            mb="xs"
            styles={() => ({
              root: {
                color: isDark ? '#e0e0e0' : '#1a1a1a',
              },
            })}
          >
            Search parameters:
          </Text>
          <Group gap="xs">
            {activeParams.map(([k, v]) => (
              <Badge key={k} variant="light" color="blue">
                {k.charAt(0).toUpperCase() + k.slice(1)}: {v}
              </Badge>
            ))}
          </Group>
        </Paper>
      )}

      {data && data.data.length > 0 ? (
        <>
          <Table
            striped
            withTableBorder
            withColumnBorders
            highlightOnHover
            style={{ width: '100%' }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th
                  style={{
                    whiteSpace: 'nowrap',
                    width: '25%',
                  }}
                  styles={() => ({
                    th: {
                      color: isDark ? '#e0e0e0' : '#1a1a1a',
                    },
                  })}
                >
                  Title
                </Table.Th>
                <Table.Th
                  style={{
                    whiteSpace: 'nowrap',
                    width: '20%',
                  }}
                  styles={() => ({
                    th: {
                      color: isDark ? '#e0e0e0' : '#1a1a1a',
                    },
                  })}
                >
                  Author
                </Table.Th>
                <Table.Th
                  style={{
                    whiteSpace: 'nowrap',
                    width: '15%',
                  }}
                  styles={() => ({
                    th: {
                      color: isDark ? '#e0e0e0' : '#1a1a1a',
                    },
                  })}
                >
                  Location
                </Table.Th>
                <Table.Th
                  style={{
                    whiteSpace: 'nowrap',
                    width: '3.5%',
                  }}
                  styles={() => ({
                    th: {
                      color: isDark ? '#e0e0e0' : '#1a1a1a',
                    },
                  })}
                >
                  Action
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          {data.totalPages && data.totalPages > 1 && (
            <Group justify="center" mt="md">
              <Pagination
                value={page}
                onChange={setPage}
                total={data.totalPages}
                disabled={isLoading}
                size="sm"
                withEdges
              />
            </Group>
          )}
        </>
      ) : (
        <Text
          ta="center"
          py="xl"
          styles={() => ({
            root: {
              color: isDark ? '#b0b0b0' : '#666666',
            },
          })}
        >
          No se encontraron resultados para la búsqueda.
        </Text>
      )}

      <BookDetail
        book={selectedBook}
        opened={openDetail}
        onClose={() => {
          setOpenDetail(false);
          setSelectedBook(null);
        }}
      />
    </Box>
  );
};

export default SearchResultsModal;
