import React from 'react';
import ReactDOM from 'react-dom/client'; // Or your usual ReactDOM import
import { MantineProvider } from '@mantine/core';
import App from './App'; // Your main app component
import '@mantine/core/styles.css'; // Import Mantine CSS

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>  {/* Good practice for development */}
    <MantineProvider> {/* Wrap with MantineProvider */}
      <App />
    </MantineProvider>
  </React.StrictMode>
);
