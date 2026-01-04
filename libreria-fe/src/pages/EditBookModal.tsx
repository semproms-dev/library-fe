import type { ContextModalProps } from '@mantine/modals';
import { Modal, Button, Stack, TextInput, Select, Group, Title, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useConfig } from '../api/query.config.api.ts';
import { useUpdateBooks } from '../api/query.update.api.ts';
import { type Book } from '../api/query.books.api.ts';
import { ClipLoader } from 'react-spinners';

interface EditBookModalInnerProps {
  book: Book;
}

type EditBookModalProps = ContextModalProps<EditBookModalInnerProps>;

const EditBookModal: React.FC<EditBookModalProps> = ({ context, id, innerProps }) => {
  const { book } = innerProps;
  const { data: config, isLoading: configLoading, error: configError } = useConfig();
  const updateBookMutation = useUpdateBooks();
  const [isDark, setIsDark] = useState(false);

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

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: book.Title || '',
      genre: book.Genre || '',
      author: book.Author || '',
      owner: book.Owner || '',
      language: book.Language || '',
      status: book.Status || '',
      year: book.Year || 0,
      location: book.Location || '',
      bookType: book.BookType || '',
    },
  });

  const genres = config?.genre ?? [];
  const owners = config?.owner ?? [];
  const status = config?.status ?? [];
  const location = config?.location ?? [];
  const bookType = config?.bookType ?? [];

  const handleSubmit = async () => {
    const values = form.getValues();
    try {
      await updateBookMutation.mutateAsync({
        bookId: book.BookId,
        title: values.title,
        author: values.author,
        year: Number(values.year) || 0,
        status: values.status,
        owner: values.owner,
        language: values.language,
        bookType: values.bookType,
        genre: values.genre,
        location: values.location,
      });
      context.closeModal(id);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (configLoading) {
    return (
      <Modal
        opened={true}
        onClose={() => context.closeModal(id)}
        title={
          <Title
            order={3}
            style={{ margin: 0 }}
            styles={(theme) => ({
              root: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          >
            Edit Book
          </Title>
        }
        centered
        size="lg"
      >
        <div
          className="spinner-container"
          style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
        >
          <ClipLoader size={50} color="#4f46e5" />
        </div>
      </Modal>
    );
  }

  if (configError) {
    return (
      <Modal
        opened={true}
        onClose={() => context.closeModal(id)}
        title={
          <Title
            order={3}
            style={{ margin: 0 }}
            styles={(theme) => ({
              root: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          >
            Edit Book
          </Title>
        }
        centered
        size="lg"
      >
        <Text c="red" size="lg" fw={500}>
          Error loading configuration
        </Text>
      </Modal>
    );
  }

  return (
    <Modal
      opened={true}
      onClose={() => context.closeModal(id)}
      title={
        <Title
          order={3}
          style={{ margin: 0 }}
          styles={(theme) => ({
            root: {
              color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
            },
          })}
        >
          Edit Book
        </Title>
      }
      centered
      size="lg"
      padding="xl"
    >
      <Stack gap="md">
        <Group grow>
          <TextInput
            label="Title"
            placeholder="Title..."
            {...form.getInputProps('title')}
            styles={(theme) => ({
              label: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          />
          <Select
            label="Select Genre"
            placeholder="Pick a value"
            searchable
            clearable
            data={genres}
            {...form.getInputProps('genre')}
            styles={(theme) => ({
              label: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          />
        </Group>
        <Group grow>
          <TextInput
            label="Author"
            placeholder="Author"
            {...form.getInputProps('author')}
            styles={(theme) => ({
              label: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          />
          <Select
            label="Owner"
            placeholder="Select an owner"
            clearable
            data={owners}
            {...form.getInputProps('owner')}
            styles={(theme) => ({
              label: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          />
        </Group>
        <Group grow>
          <TextInput
            label="Language"
            placeholder="Language"
            {...form.getInputProps('language')}
            styles={(theme) => ({
              label: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          />
          <Select
            label="Status"
            clearable
            placeholder="Select a status"
            data={status}
            {...form.getInputProps('status')}
            styles={(theme) => ({
              label: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          />
        </Group>
        <Group grow>
          <TextInput
            label="Year"
            placeholder="Year"
            {...form.getInputProps('year')}
            styles={(theme) => ({
              label: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          />
          <Select
            label="Location"
            clearable
            placeholder="Location"
            searchable
            data={location}
            {...form.getInputProps('location')}
            styles={(theme) => ({
              label: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          />
        </Group>
        <Group grow>
          <Select
            label="Book Type"
            clearable
            placeholder="Book Type"
            searchable
            data={bookType}
            {...form.getInputProps('bookType')}
            styles={(theme) => ({
              label: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          />
        </Group>

        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={() => context.closeModal(id)}
            styles={(theme) => ({
              root: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="#408EE0"
            loading={updateBookMutation.isPending}
            disabled={updateBookMutation.isPending || !form.isDirty()}
          >
            {updateBookMutation.isPending ? 'Updating...' : 'Update Book'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default EditBookModal;
