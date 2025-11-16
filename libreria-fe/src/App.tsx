import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { Group } from '@mantine/core';
import './App.css';
import bookIcon from './assets/book-icon.jpg';

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <Group>
        <img
          src={bookIcon}
          alt="Book icon"
          style={{ width: '64px', height: '64px', marginBottom: '15px' }}
        />
        <h1>Library</h1>
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
    </div>
  );
}

export default App;
