import React, { useState, useMemo } from 'react';
import PortfolioForm from './components/PortfolioForm';
import PortfolioPreview from './components/PortFolioPreview';
import { Container, CssBaseline, Box, Typography, AppBar, Toolbar, IconButton, Tooltip } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode],
  );

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <CodeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Portfolio Builder
          </Typography>
          <Tooltip title="Toggle Dark/Light Mode">
            <IconButton onClick={handleThemeToggle} color="inherit">
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <BuildIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
        <Typography variant="h5" gutterBottom color="textSecondary">
          Build a Professional Portfolio Instantly with the Power of AI!
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Simply provide your skills, experience, projects, and a brief summary, and let our intelligent AI craft a stunning portfolio for you in seconds.
        </Typography>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <PortfolioForm />
        <PortfolioPreview />
      </Container>
      <Box sx={{ py: 3, mt: 4, textAlign: 'center' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} AI Portfolio Builder 
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;