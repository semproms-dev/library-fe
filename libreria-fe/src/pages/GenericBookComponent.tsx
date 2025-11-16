import { Button, Select, Group, TextInput, Text, Stack, Box, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';

type Props = {
  component: string;
};

export function GenericBookComponent(props: Props) {
  const isSearch = props.component === 'search';
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      genre: '',
      author: '',
      owner: '',
      language: '',
      status: '',
      year: '',
      location: '',
    },
  });

  return (
    <Container size="md" style={{ display: 'flex', justifyContent: 'center' }}>
      <Stack gap="md" style={{ width: '100%', maxWidth: '800px' }}>
        <Group grow>
          <TextInput 
            label={'Title'} 
            placeholder={'Title...'}
            {...form.getInputProps('title')}
          />
          <Select
            label={'Select Genre'}
            placeholder={'Pick a value'}
            searchable
            data={['Fantasy', 'Science Fiction', 'Biology']}
            {...form.getInputProps('genre')}
          />
        </Group>
        <Group grow>
          <TextInput 
            label={'Author'} 
            placeholder={'Author'}
            {...form.getInputProps('author')}
          />
          <Select
            label={'Owner'}
            placeholder={'Select an owner'}
            data={['Cristina', 'Luis']}
            {...form.getInputProps('owner')}
          />
        </Group>
        <Group grow>
          <TextInput 
            label={'Language'} 
            placeholder={'Language'}
            {...form.getInputProps('language')}
          />
          <Select
            label={'Status'}
            placeholder={'Select a status'}
            data={['TBR', 'R', 'WIP', 'HB']}
            {...form.getInputProps('status')}
          />
        </Group>
        <Group grow>
          <TextInput 
            label={'Year'} 
            placeholder={'Year'}
            {...form.getInputProps('year')}
          />
          <Select
            label={'Location'}
            placeholder={'Location'}
            searchable
            data={['Office1', 'Office2', 'Office3']}
            {...form.getInputProps('location')}
          />
        </Group>
        <Box mt="lg" style={{ display: 'flex', justifyContent: 'center' }}>
          {isSearch ? (
            <Button
              onClick={() => {
                const values = form.getValues();
                console.log('Search values:', values);
                // TODO: Implement search functionality
              }}
              color={'#408EE0'}
            >
              Search
            </Button>
          ) : (
            <Button
              onClick={() => {
                const values = form.getValues();
                console.log('Form values:', values);
                modals.openConfirmModal({
                  title: 'Are you sure you want to insert this book?',
                  centered: true,
                  children: (
                    <Stack gap="xs" mt="md">
                      <Text size="sm" fw={500}>Book Details:</Text>
                      {values.title && (
                        <Text size="sm"><strong>Title:</strong> {values.title}</Text>
                      )}
                      {values.author && (
                        <Text size="sm"><strong>Author:</strong> {values.author}</Text>
                      )}
                      {values.genre && (
                        <Text size="sm"><strong>Genre:</strong> {values.genre}</Text>
                      )}
                      {values.owner && (
                        <Text size="sm"><strong>Owner:</strong> {values.owner}</Text>
                      )}
                      {values.language && (
                        <Text size="sm"><strong>Language:</strong> {values.language}</Text>
                      )}
                      {values.status && (
                        <Text size="sm"><strong>Status:</strong> {values.status}</Text>
                      )}
                      {values.year && (
                        <Text size="sm"><strong>Year:</strong> {values.year}</Text>
                      )}
                      {values.location && (
                        <Text size="sm"><strong>Location:</strong> {values.location}</Text>
                      )}
                      {!values.title && !values.author && !values.genre && !values.owner && 
                       !values.language && !values.status && !values.year && !values.location && (
                        <Text size="sm" c="dimmed">No values entered yet.</Text>
                      )}
                    </Stack>
                  ),
                  labels: { confirm: 'Confirm', cancel: 'Cancel' },
                  confirmProps: { color: 'blue' },
                  onConfirm: () => {
                    const values = form.getValues();
                    console.log('Confirmed with values:', values);
                    // TODO: Implement insert functionality
                  },
                  onCancel: () => {
                    console.log('Cancelled');
                  },
                });
              }}
              color={'#408EE0'}
            >
              Insert book
            </Button>
          )}
        </Box>
      </Stack>
    </Container>
  );
}
