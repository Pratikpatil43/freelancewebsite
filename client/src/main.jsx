import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        containerStyle={{ zIndex: 99999, top: 16, left: 12, right: 12 }}
        toastOptions={{
          duration: 3500,
          className: 'app-toast',
          style: { maxWidth: 'min(420px, calc(100vw - 24px))' },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
