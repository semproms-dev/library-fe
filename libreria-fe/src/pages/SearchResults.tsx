import type { ContextModalProps } from '@mantine/modals';
import { Table, Button, Box, Text, Loader, Paper, Group, Badge } from '@mantine/core';
import React from 'react';
import { useState, useEffect } from 'react';
import { type Form, useBooks } from '../api/query.books.api.ts';
import { BookDetail } from './BookDetail.tsx';

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

const SearchResultsModal: React.FC<SearchResultsModalProps> = ({ context, id, innerProps }) => {
  const { searchParams } = innerProps;
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
  const { data, isLoading } = useBooks(emptyBookState);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (isLoading) {
    return (
      <Box p="xl" style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader size="lg" color="blue" />
      </Box>
    );
  }

  const rows = data?.map((element: Book) => (
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
    </Table.Tr>
  ));

  const activeParams = Object.entries(searchParams).filter(
    ([, v]) => v !== '' && v !== 0 && v != null,
  );

  return (
    <Box p="md">
      {data && (
        <Text mb="md" fw={500}>
          Total number of records retrieved: <b>{data.length}</b>
        </Text>
      )}

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

      {data && data.length > 0 ? (
        <Table striped withTableBorder withColumnBorders highlightOnHover style={{ width: '100%' }}>
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
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
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

      <Button onClick={() => context.closeModal(id)} mt="md" fullWidth>
        Close window
      </Button>
    </Box>
  );
};

export default SearchResultsModal;
