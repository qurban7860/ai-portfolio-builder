import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioForm from './components/PortfolioForm';
import PortfolioPreview from './components/PortFolioPreview';
import {
  Container, CssBaseline, Box, Typography, AppBar,
  Toolbar, IconButton, Tooltip
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => (
    mode === 'light' ? lightTheme : darkTheme
  ), [mode]);

  const handleThemeToggle = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary" elevation={3}>
        <Toolbar>
          <CodeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AI Portfolio Builder
          </Typography>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={handleThemeToggle} color="inherit">
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5, pt: 4 }}>
            <Routes>
              <Route path="/" element={
                <Box textAlign="center">
                  {/* <BuildIcon sx={{ fontSize: 64, color: theme.palette.primary.main }} />
                  <Typography variant="h4" sx={{ mt: 2 }} color="text.primary">
                    Build Your Portfolio in Seconds
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mt: 1 }}>
                    Provide your professional details and let AI create a polished portfolio for you – smart, fast, and effective.
                  </Typography> */}
                  <PortfolioForm />
                </Box>
              } />
              <Route path="/preview" element={<PortfolioPreview />} />
            </Routes>
      </Container>

      <Box sx={{ py: 4, mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} AI Portfolio Builder 
        </Typography>
      </Box>
    </ThemeProvider>
    </Router>
  );
}

export default App;
