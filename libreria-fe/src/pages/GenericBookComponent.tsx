import { Button, Select, Group, TextInput, Text, Stack, Box, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ClipLoader } from 'react-spinners';
import { modals } from '@mantine/modals';
import { useConfig } from '../api/query.config.api.ts';
import { useInsertBooks } from '../api/query.insert.api.ts';

type Props = {
  component: string;
};

export function GenericBookComponent(props: Props) {
  const { data: config, isLoading, error } = useConfig();
  const genres = config?.genre ?? [];
  const owners = config?.owner ?? [];
  const status = config?.status ?? [];
  const location = config?.location ?? [];
  const bookType = config?.bookType ?? [];
  const insertBookMutation = useInsertBooks();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      genre: '',
      author: '',
      owner: '',
      language: '',
      status: '',
      year: 0,
      location: '',
      bookType: '',
    },
    validate: {
      title: (value) =>
        !value || (typeof value === 'string' && value.trim() === '') ? 'Title is required' : null,
      author: (value) =>
        !value || (typeof value === 'string' && value.trim() === '') ? 'Author is required' : null,
      year: (value) => {
        const yearNum = typeof value === 'string' ? Number(value) : value;
        if (!value || yearNum === 0 || isNaN(yearNum)) {
          return 'Year is required';
        }
        if (yearNum < 0) {
          return 'Year must be a positive number';
        }
        if (yearNum > new Date().getFullYear()) {
          return `Year cannot be greater than ${new Date().getFullYear()}`;
        }
        return null;
      },
      location: (value) =>
        !value || (typeof value === 'string' && value.trim() === '')
          ? 'Location is required'
          : null,
      owner: (value) =>
        !value || (typeof value === 'string' && value.trim() === '') ? 'Owner is required' : null,
    },
  });

  const isSearch = props.component === 'search';

  if (isLoading)
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color="#4f46e5" />
      </div>
    );
  if (error) return <p>Error</p>;

  return (
    <Container size="md" style={{ display: 'flex', justifyContent: 'center' }}>
      <Stack gap="md" style={{ width: '100%', maxWidth: '800px' }}>
        <Group grow>
          <TextInput
            label={'Title'}
            placeholder={'Title...'}
            required={!isSearch}
            {...form.getInputProps('title')}
          />
          <Select
            label={'Select Genre'}
            placeholder={'Pick a value'}
            searchable
            clearable
            data={genres}
            {...form.getInputProps('genre')}
          />
        </Group>
        <Group grow>
          <TextInput
            label={'Author'}
            placeholder={'Author'}
            required={!isSearch}
            {...form.getInputProps('author')}
          />
          <Select
            label={'Owner'}
            placeholder={'Select an owner'}
            clearable
            required={!isSearch}
            data={owners}
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
            clearable
            placeholder={'Select a status'}
            data={status}
            {...form.getInputProps('status')}
          />
        </Group>
        <Group grow>
          <TextInput
            label={'Year'}
            placeholder={'Year'}
            type="number"
            required={!isSearch}
            {...form.getInputProps('year')}
          />
          <Select
            label={'Location'}
            clearable
            placeholder={'Location'}
            searchable
            required={!isSearch}
            data={location}
            {...form.getInputProps('location')}
          />
        </Group>
        <Group grow>
          <Select
            label={'Book Type'}
            clearable
            placeholder={'Book Type'}
            searchable
            data={bookType}
            {...form.getInputProps('bookType')}
          />
        </Group>
        <Box mt="lg" style={{ display: 'flex', justifyContent: 'center' }}>
          {isSearch ? (
            <Button
              onClick={() => {
                const values = form.getValues();

                modals.openContextModal({
                  modal: 'searchTable',
                  title: 'Search results',
                  centered: true,
                  size: '90%',
                  innerProps: {
                    // Estas props se envían a SearchResultsModal
                    data: [],
                    searchParams: values,
                  },
                });
              }}
              color={'#408EE0'}
            >
              Search
            </Button>
          ) : (
            <Button
              onClick={() => {
                // Validate form before proceeding
                const validation = form.validate();
                if (!validation.hasErrors) {
                  const values = form.getValues();
                  console.log('Form values:', values);
                  modals.openConfirmModal({
                    title: 'Are you sure you want to insert this book?',
                    centered: true,
                    children: (
                      <Stack gap="xs" mt="md">
                        <Text size="sm" fw={500}>
                          Book Details:
                        </Text>
                        {values.title && (
                          <Text size="sm">
                            <strong>Title:</strong> {values.title}
                          </Text>
                        )}
                        {values.author && (
                          <Text size="sm">
                            <strong>Author:</strong> {values.author}
                          </Text>
                        )}
                        {values.genre && (
                          <Text size="sm">
                            <strong>Genre:</strong> {values.genre}
                          </Text>
                        )}
                        {values.owner && (
                          <Text size="sm">
                            <strong>Owner:</strong> {values.owner}
                          </Text>
                        )}
                        {values.language && (
                          <Text size="sm">
                            <strong>Language:</strong> {values.language}
                          </Text>
                        )}
                        {values.status && (
                          <Text size="sm">
                            <strong>Status:</strong> {values.status}
                          </Text>
                        )}
                        {values.year && (
                          <Text size="sm">
                            <strong>Year:</strong> {values.year}
                          </Text>
                        )}
                        {values.location && (
                          <Text size="sm">
                            <strong>Location:</strong> {values.location}
                          </Text>
                        )}
                        {values.bookType && (
                          <Text size="sm">
                            <strong>Book Type:</strong> {values.bookType}
                          </Text>
                        )}
                        {!values.title &&
                          !values.author &&
                          !values.genre &&
                          !values.owner &&
                          !values.language &&
                          !values.status &&
                          !values.year &&
                          !values.location && (
                            <Text size="sm" c="dimmed">
                              No values entered yet.
                            </Text>
                          )}
                      </Stack>
                    ),
                    labels: { confirm: 'Confirm', cancel: 'Cancel' },
                    confirmProps: { color: 'blue' },
                    onConfirm: async () => {
                      const values = form.getValues();
                      // Convert year to number if it's a string
                      const bookData = {
                        ...values,
                        year: typeof values.year === 'string' ? Number(values.year) : values.year,
                      };
                      await insertBookMutation.mutateAsync(bookData);
                    },
                    onCancel: () => {},
                  });
                }
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
