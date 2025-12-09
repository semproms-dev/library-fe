import type { ContextModalProps } from '@mantine/modals';
import { Table, Button, Box, Text, Loader, Paper, Group, Badge } from '@mantine/core';
import React from 'react';
import { type Form, useBooks } from '../api/query.books.api.ts';

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

// Tipado del componente de Mantine Modals
type SearchResultsModalProps = ContextModalProps<SearchModalInnerProps>;

const SearchResultsModal: React.FC<SearchResultsModalProps> = ({ context, id, innerProps }) => {
  const { searchParams } = innerProps;

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

  if (isLoading) {
    return (
      <Box p="xl" style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader size="lg" color="blue" />
      </Box>
    );
  }

  const rows = data?.map((element: Book) => (
    <Table.Tr key={element.BookId}>
      <Table.Td style={{ whiteSpace: 'nowrap' }}>{element.BookId}</Table.Td>
      <Table.Td style={{ wordBreak: 'break-word' }}>{element.Title}</Table.Td>
      <Table.Td style={{ wordBreak: 'break-word' }}>{element.Author}</Table.Td>
      <Table.Td style={{ whiteSpace: 'nowrap' }}>{element.Status}</Table.Td>
      <Table.Td style={{ whiteSpace: 'nowrap' }}>{element.Genre}</Table.Td>
      <Table.Td style={{ whiteSpace: 'nowrap' }}>{element.Language}</Table.Td>
      <Table.Td style={{ whiteSpace: 'nowrap' }}>{element.Owner}</Table.Td>
    </Table.Tr>
  ));

  const activeParams = Object.entries(searchParams)
    .filter(([, v]) => v !== '' && v !== 0 && v != null);

  return (
    <Box p="md">
      <Box
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'var(--mantine-color-body)',
          paddingBottom: '1rem',
          marginBottom: '1rem'
        }}
      >
        {data && <Text mb="md" fw={500}>Total number of records retrieved: {data.length}</Text>}

        {activeParams.length > 0 && (
          <Paper 
            p="md" 
            withBorder 
            style={{ 
              backgroundColor: 'var(--mantine-color-gray-0)'
            }}
          >
            <Text size="sm" fw={500} mb="xs">Parámetros de búsqueda:</Text>
            <Group gap="xs">
              {activeParams.map(([k, v]) => (
                <Badge key={k} variant="light" color="blue">
                  {k.charAt(0).toUpperCase() + k.slice(1)}: {v}
                </Badge>
              ))}
            </Group>
          </Paper>
        )}
      </Box>

      {data && data.length > 0 ? (
        <Table striped withTableBorder withColumnBorders highlightOnHover style={{ width: '100%' }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ whiteSpace: 'nowrap', width: '5%' }}>ID</Table.Th>
              <Table.Th style={{ whiteSpace: 'nowrap', width: '25%' }}>Título</Table.Th>
              <Table.Th style={{ whiteSpace: 'nowrap', width: '20%' }}>Autor</Table.Th>
              <Table.Th style={{ whiteSpace: 'nowrap', width: '10%' }}>Estado</Table.Th>
              <Table.Th style={{ whiteSpace: 'nowrap', width: '15%' }}>Género</Table.Th>
              <Table.Th style={{ whiteSpace: 'nowrap', width: '10%' }}>Idioma</Table.Th>
              <Table.Th style={{ whiteSpace: 'nowrap', width: '15%' }}>Propietario</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      ) : (
        <Text c="dimmed" ta="center" py="xl">
          No se encontraron resultados para la búsqueda.
        </Text>
      )}

      <Button onClick={() => context.closeModal(id)} mt="md" fullWidth>
        Cerrar Ventana
      </Button>
    </Box>
  );
};

export default SearchResultsModal;
