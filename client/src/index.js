import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './theme'; 
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './context/AuthContext'; 
import { SnackbarProvider } from 'notistack'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={lightTheme}>
          <SnackbarProvider 
            maxSnack={3} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
          >
            <AuthProvider> 
              <App />
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
