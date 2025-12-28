import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import SearchResultsModal from './pages/SearchResults.tsx';
import EditBookModal from './pages/EditBookModal.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@mantine/core/styles.css';
import './index.css';

const customModals = {
  searchTable: SearchResultsModal, // 'searchTable' es el ID que usaremos luego
  editBook: EditBookModal,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ModalsProvider modals={customModals}>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
