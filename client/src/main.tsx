import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <BrowserRouter>
         <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <App />
            <ToastContainer />
         </ThemeProvider>
      </BrowserRouter>
   </React.StrictMode>
);
