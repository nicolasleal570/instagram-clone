import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MainRouter } from './pages/MainRouter';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MainRouter />
  </StrictMode>
);
