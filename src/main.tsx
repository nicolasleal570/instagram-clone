import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { locale, extend } from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MainRouter } from './pages/MainRouter';
import './index.css';

locale('es');
extend(relativeTime);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MainRouter />
  </StrictMode>
);
