// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { AuthProvider } from './components/hooks/AuthContext.tsx';
import App from './App.tsx';
import store from './components/store/index.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
      <Provider store={store}> 
          <BrowserRouter>
          <AuthProvider>
             <App />
            </AuthProvider>
          </BrowserRouter>
      </Provider>
  // </StrictMode>,
);
