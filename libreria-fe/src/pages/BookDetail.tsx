import { Modal, Button, Stack, Text, Group, Badge, Divider, Paper, Title } from '@mantine/core';
import { type Book } from '../api/query.books.api.ts';
import { useEffect, useState } from 'react';

interface BookDetailProps {
  book: Book | null;
  opened: boolean;
  onClose: () => void;
}

export function BookDetail({ book, opened, onClose }: BookDetailProps) {
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

  if (!book) {
    return null;
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
          Detalles del Libro
        </Title>
      }
      centered
      size="lg"
      padding="xl"
    >
      <Stack gap="md">
        {/* Título y Autor destacados */}
        <Paper 
          p="md" 
          withBorder 
          styles={(theme) => ({
            root: {
              backgroundColor: isDark 
                ? theme.colors.blue[9] 
                : theme.colors.blue[0],
            },
          })}
        >
          <Stack gap="xs">
            <Text 
              size="xl" 
              fw={700} 
              styles={(theme) => ({
                root: {
                  color: isDark 
                    ? theme.colors.blue[2] 
                    : theme.colors.blue[7],
                },
              })}
            >
              {book.Title}
            </Text>
            <Text 
              size="lg" 
              styles={(theme) => ({
                root: {
                  color: isDark 
                    ? theme.colors.gray[4] 
                    : theme.colors.gray[6],
                },
              })}
            >
              por {book.Author}
            </Text>
          </Stack>
        </Paper>

        <Divider />

        {/* Información Principal */}
        <Stack gap="sm">
          <Title 
            order={4} 
            size="h5"
            styles={(theme) => ({
              root: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          >
            Información Principal
          </Title>
          <Group gap="md">
            <div style={{ flex: 1 }}>
              <Text 
                size="sm" 
                fw={500} 
                mb={4}
                styles={(theme) => ({
                  root: {
                    color: isDark 
                      ? theme.colors.gray[4] 
                      : theme.colors.gray[6],
                  },
                })}
              >
                Año de Publicación
              </Text>
              <Text 
                size="md"
                styles={(theme) => ({
                  root: {
                    color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
                  },
                })}
              >
                {book.Year || 'N/A'}
              </Text>
            </div>
            <div style={{ flex: 1 }}>
              <Text 
                size="sm" 
                fw={500} 
                mb={4}
                styles={(theme) => ({
                  root: {
                    color: isDark 
                      ? theme.colors.gray[4] 
                      : theme.colors.gray[6],
                  },
                })}
              >
                Idioma
              </Text>
              <Text 
                size="md"
                styles={(theme) => ({
                  root: {
                    color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
                  },
                })}
              >
                {book.Language || 'N/A'}
              </Text>
            </div>
          </Group>
        </Stack>

        <Divider />

        {/* Categorización */}
        <Stack gap="sm">
          <Title 
            order={4} 
            size="h5"
            styles={(theme) => ({
              root: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          >
            Categorización
          </Title>
          <Group gap="xs">
            {book.Genre && (
              <Badge size="lg" variant="light" color="violet">
                {book.Genre}
              </Badge>
            )}
            {book.BookType && (
              <Badge size="lg" variant="light" color="indigo">
                {book.BookType}
              </Badge>
            )}
          </Group>
        </Stack>

        <Divider />

        {/* Estado y Ubicación */}
        <Stack gap="sm">
          <Title 
            order={4} 
            size="h5"
            styles={(theme) => ({
              root: {
                color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
              },
            })}
          >
            Estado y Ubicación
          </Title>
          <Group gap="md">
            <div style={{ flex: 1 }}>
              <Text 
                size="sm" 
                fw={500} 
                mb={4}
                styles={(theme) => ({
                  root: {
                    color: isDark 
                      ? theme.colors.gray[4] 
                      : theme.colors.gray[6],
                  },
                })}
              >
                Estado
              </Text>
              <Badge
                size="lg"
                variant="filled"
                color={book.Status === 'Disponible' ? 'green' : 'orange'}
              >
                {book.Status || 'N/A'}
              </Badge>
            </div>
            <div style={{ flex: 1 }}>
              <Text 
                size="sm" 
                fw={500} 
                mb={4}
                styles={(theme) => ({
                  root: {
                    color: isDark 
                      ? theme.colors.gray[4] 
                      : theme.colors.gray[6],
                  },
                })}
              >
                Ubicación
              </Text>
              <Text 
                size="md"
                styles={(theme) => ({
                  root: {
                    color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
                  },
                })}
              >
                {book.Location || 'N/A'}
              </Text>
            </div>
          </Group>
        </Stack>

        <Divider />

        {/* Propietario */}
        {book.Owner && (
          <>
            <Stack gap="sm">
              <Title 
                order={4} 
                size="h5"
                styles={(theme) => ({
                  root: {
                    color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
                  },
                })}
              >
                Propietario
              </Title>
              <Text 
                size="md"
                styles={(theme) => ({
                  root: {
                    color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
                  },
                })}
              >
                {book.Owner}
              </Text>
            </Stack>
            <Divider />
          </>
        )}

        {/* ID del Libro (información técnica) */}
        <Text 
          size="xs" 
          ta="center"
          styles={(theme) => ({
            root: {
              color: isDark 
                ? theme.colors.gray[5] 
                : theme.colors.gray[6],
            },
          })}
        >
          ID: {book.BookId}
        </Text>

        {/* Botón de cierre */}
        <Button onClick={onClose} fullWidth mt="md" color="#408EE0">
          Cerrar
        </Button>
      </Stack>
    </Modal>
  );
}
