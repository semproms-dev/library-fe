import type { ContextModalProps } from '@mantine/modals';
import { Table, Button, Box, Title, Text, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { type Form, useBooks } from '../api/query.books.api.ts';
import { BounceLoader } from 'react-spinners';

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
  const [state, setState] = useState(true);

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
      <BounceLoader color={'blue'} loading={isLoading} size={150} aria-label={'Loading spinner'} />
    );
  }

  const rows = data?.map((element: Book) => (
    <Table.Tr key={element.BookId}>
      <Table.Td>{element.BookId}</Table.Td>
      <Table.Td>{element.Title}</Table.Td>
      <Table.Td>{element.Author}</Table.Td>
      <Table.Td>{element.Status}</Table.Td>
      <Table.Td>{element.Genre}</Table.Td>
      <Table.Td>{element.Language}</Table.Td>
      <Table.Td>{element.Owner}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Modal
      opened={state}
      onClose={() => {
        setState(false);
      }}
      size="auto" // modal grows to content
      withCloseButton
      centered
      styles={{
        content: {
          padding: 0, // optional: avoids squeezing the table
        },
      }}
    >
      <Box>
        <Title order={3}>Resultados de Búsqueda</Title>
        <Text size="sm" c="dimmed" mb="md">
          Parámetros: Estado: **{searchParams.status}**
        </Text>

        <Table striped withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Author</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Genre</Table.Th>
              <Table.Th>Language</Table.Th>
              <Table.Th>Owner</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>

        <Button onClick={() => context.closeModal(id)} mt="xl">
          Cerrar Ventana
        </Button>
      </Box>
    </Modal>
  );
};

export default SearchResultsModal;
