import { useStats } from '../api/query.stats.api.ts';
import { ClipLoader } from 'react-spinners';
import { Text, Stack, Paper, Title, Grid } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Config } from '../api/query.stats.api.ts';

export function StatsComponent() {
  const { data: stats, isLoading, isError, error } = useStats();
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

  if (isLoading)
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color="#4f46e5" />
      </div>
    );

  if (isError) {
    // Log the full error for debugging
    console.error('Stats error:', error);

    // Extract error message
    let errorMessage = 'An error occurred while fetching stats';

    if (axios.isAxiosError(error)) {
      // Axios error - check response data first, then message
      errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        `HTTP ${error.response?.status}: ${error.response?.statusText}` ||
        errorMessage;
    } else if (error instanceof Error) {
      // Standard Error object
      errorMessage = error.message || errorMessage;
    }

    return (
      <Text c="red" size="lg" fw={500}>
        Error: {errorMessage}
      </Text>
    );
  }

  // The API returns Array<Config>
  const statsArray: Config[] = stats || [];

  if (statsArray.length === 0) {
    return (
      <Text
        ta="center"
        py="xl"
        styles={() => ({
          root: {
            color: isDark ? '#b0b0b0' : '#666666',
          },
        })}
      >
        No statistics available.
      </Text>
    );
  }

  return (
    <Stack gap="md" p="md">
      {statsArray.map((stat, index) => (
        <Paper
          key={index}
          p="xl"
          radius="md"
          withBorder
          styles={(theme) => ({
            root: {
              backgroundColor: isDark ? '#2d2d2d' : '#ffffff',
              borderColor: isDark ? '#444' : theme.colors.gray[3],
            },
          })}
        >
          <Stack gap="lg">
            <Title
              order={2}
              styles={(theme) => ({
                root: {
                  color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
                },
              })}
            >
              Statistics for {stat.Owner}
            </Title>

            <Grid gutter="md">
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Paper
                  p="md"
                  radius="sm"
                  styles={(theme) => ({
                    root: {
                      backgroundColor: isDark ? '#1a1a1a' : theme.colors.gray[0],
                    },
                  })}
                >
                  <Stack gap="xs">
                    <Text
                      size="sm"
                      fw={500}
                      styles={() => ({
                        root: {
                          color: isDark ? '#b0b0b0' : '#666666',
                        },
                      })}
                    >
                      Total Books
                    </Text>
                    <Text
                      size="xl"
                      fw={700}
                      styles={() => ({
                        root: {
                          color: isDark ? '#e0e0e0' : '#213547',
                        },
                      })}
                    >
                      {stat.Total_Books}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Paper
                  p="md"
                  radius="sm"
                  styles={(theme) => ({
                    root: {
                      backgroundColor: isDark ? '#1a1a1a' : theme.colors.gray[0],
                    },
                  })}
                >
                  <Stack gap="xs">
                    <Text
                      size="sm"
                      fw={500}
                      styles={() => ({
                        root: {
                          color: isDark ? '#b0b0b0' : '#666666',
                        },
                      })}
                    >
                      Already Read
                    </Text>
                    <Text
                      size="xl"
                      fw={700}
                      styles={() => ({
                        root: {
                          color: isDark ? '#e0e0e0' : '#213547',
                        },
                      })}
                    >
                      {stat.Already_Read}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Paper
                  p="md"
                  radius="sm"
                  styles={(theme) => ({
                    root: {
                      backgroundColor: isDark ? '#1a1a1a' : theme.colors.gray[0],
                    },
                  })}
                >
                  <Stack gap="xs">
                    <Text
                      size="sm"
                      fw={500}
                      styles={() => ({
                        root: {
                          color: isDark ? '#b0b0b0' : '#666666',
                        },
                      })}
                    >
                      To Read
                    </Text>
                    <Text
                      size="xl"
                      fw={700}
                      styles={() => ({
                        root: {
                          color: isDark ? '#e0e0e0' : '#213547',
                        },
                      })}
                    >
                      {stat.To_Read}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Paper
                  p="md"
                  radius="sm"
                  styles={(theme) => ({
                    root: {
                      backgroundColor: isDark ? '#1a1a1a' : theme.colors.gray[0],
                    },
                  })}
                >
                  <Stack gap="xs">
                    <Text
                      size="sm"
                      fw={500}
                      styles={() => ({
                        root: {
                          color: isDark ? '#b0b0b0' : '#666666',
                        },
                      })}
                    >
                      Currently Reading
                    </Text>
                    <Text
                      size="xl"
                      fw={700}
                      styles={() => ({
                        root: {
                          color: isDark ? '#e0e0e0' : '#213547',
                        },
                      })}
                    >
                      {stat.Reading}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Paper
                  p="md"
                  radius="sm"
                  styles={(theme) => ({
                    root: {
                      backgroundColor: isDark ? '#1a1a1a' : theme.colors.gray[0],
                    },
                  })}
                >
                  <Stack gap="xs">
                    <Text
                      size="sm"
                      fw={500}
                      styles={() => ({
                        root: {
                          color: isDark ? '#b0b0b0' : '#666666',
                        },
                      })}
                    >
                      Percentage Read
                    </Text>
                    <Text
                      size="xl"
                      fw={700}
                      styles={() => ({
                        root: {
                          color: isDark ? '#e0e0e0' : '#213547',
                        },
                      })}
                    >
                      {stat.Percentage_Read}%
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
