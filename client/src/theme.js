import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    error: {
      main: red.A200,
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#fff',
      secondary: '#e0e0e0',
    },
    mode: 'dark',
  },
});

export default lightTheme;
