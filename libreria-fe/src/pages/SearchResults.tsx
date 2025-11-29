// SearchResultsModal.tsx
// SearchResultsModal.tsx
import type { ContextModalProps } from '@mantine/modals';
import { Table, Button, Box, Title, Text } from '@mantine/core';
import React from 'react';
import { useBooks } from '../api/query.books.api.ts';
import { BounceLoader } from 'react-spinners';

// Tipos de datos que tu tabla mostrará
interface SearchItem {
  id: number;
  name: string;
  value: number;
}
interface SearchParams {
  status: string;
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
  const { data, isLoading } = useBooks('author', 'Asimov');

  if (isLoading) {
    return (
      <BounceLoader color={'blue'} loading={isLoading} size={150} aria-label={'Loading spinner'} />
    );
  }

  const rows = data?.map((element) => (
    <Table.Tr key={element.bookId}>
      <Table.Td>{element.bookId}</Table.Td>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.author}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>{element.genre}</Table.Td>
      <Table.Td>{element.language}</Table.Td>
      <Table.Td>{element.owner}</Table.Td>
    </Table.Tr>
  ));

  return (
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
  );
};

export default SearchResultsModal;
