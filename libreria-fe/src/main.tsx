import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import SearchResultsModal from './pages/SearchResults.tsx';
import '@mantine/core/styles.css';
import './index.css';

const customModals = {
  searchTable: SearchResultsModal, // 'searchTable' es el ID que usaremos luego
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider modals={customModals}>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
);
