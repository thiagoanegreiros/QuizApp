import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

let root: ReactDOM.Root | null = null;

export function bootstrapApp() {
  const rootElement = document.getElementById('root');

  if (!root) {
    root = ReactDOM.createRoot(rootElement!);
  }

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
bootstrapApp()