import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store } from './store.ts';
import App from './App.tsx';

// Create a custom theme
const theme = extendTheme({
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
  },
  fonts: {
    body: 'Roboto, sans-serif',
  },
});

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
