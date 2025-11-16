import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { Group, Container, Title } from '@mantine/core';
import './App.css';
import bookIcon from './assets/book-icon.jpg';

function App() {
  const location = useLocation();

  return (
    <Container size="xl" py="xl">
      <Group gap="md" mb="xl" align="center" justify="center" style={{ paddingLeft: '1px' }}>
        <img
          src={bookIcon}
          alt="Book icon"
          style={{ width: '64px', height: '64px', objectFit: 'contain', paddingBottom: '10px' }}
        />
        <Title order={1}>Library</Title>
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
