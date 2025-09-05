import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ContextMain from './ContextMain.jsx';  // ✅ Use ContextMain

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextMain>
      <App />
    </ContextMain>
  </StrictMode>
);
