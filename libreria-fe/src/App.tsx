import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { Group, Container, Switch, Title } from '@mantine/core';
import './App.css';
import bookIconDark from './assets/img-dark.png';
import bookIconLight from './assets/img-light.png';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  type Theme = 'Dark' | 'Light';

  // Load theme from localStorage or default to 'Light'
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    return savedTheme || 'Light';
  });

  const handleChange = (checked: boolean) => {
    const newTheme = checked ? 'Dark' : 'Light';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Container size="xl" py="xl">
      <Group align={'center'} justify="flex-end" mb="md">
        <Switch
          checked={theme === 'Dark'}
          onChange={(event) => handleChange(event.currentTarget.checked)}
          label={theme === 'Dark' ? 'Dark Mode' : 'Light Mode'}
        />
      </Group>
      <Group gap="md" mb="xl" align="center" justify="center" style={{ paddingLeft: '1px' }}>
        <img
          src={theme === 'Light' ? bookIconLight : bookIconDark}
          alt="Book icon"
          style={{ width: '100px', height: '100px', objectFit: 'contain', paddingBottom: '10px' }}
        />
        <Title order={1} style={{ fontSize: '2.5rem' }}>
          Library
        </Title>
      </Group>

      <div className="tabs-container">
        <Link to="/" className={`tab ${location.pathname === '/' ? 'active' : ''}`}>
          Search books
        </Link>
        <Link
          to="/insertBook"
          className={`tab ${location.pathname === '/insertBook' ? 'active' : ''}`}
        >
          Insert books
        </Link>
      </div>
      <div className="tab-content">
        <Outlet />
      </div>
    </Container>
  );
}

export default App;
