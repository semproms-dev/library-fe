// SearchResultsModal.tsx
// SearchResultsModal.tsx
import type { ContextModalProps } from '@mantine/modals';
import { Table, Button, Box, Title, Text } from '@mantine/core';
import React from 'react';

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
  const { data, searchParams } = innerProps;

  const rows = data.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.value}</Table.Td>
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
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Valor</Table.Th>
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
