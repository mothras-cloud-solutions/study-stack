import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css'
import App from './App.tsx';
import Demo from './Demo.tsx';
import Skeleton from './components/Skeleton/index.tsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* <App /> */}
    <Demo />
    {/* <Skeleton /> */}
  </BrowserRouter>
);
