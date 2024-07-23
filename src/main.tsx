import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store } from './store.ts'; // Ensure your Redux store is correctly imported
import App from './App.tsx'; // Adjust path based on your application structure

// Create a custom theme using createTheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Adjust primary color as per your design
    },
    secondary: {
      main: '#dc004e', // Adjust secondary color as per your design
    },
    // Add more customizations as needed
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Adjust default font family
    // Add more typography configurations as needed
  },
});

// Render your application with ThemeProvider and Redux Provider
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
