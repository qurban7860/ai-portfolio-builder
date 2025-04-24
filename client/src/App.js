import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioForm from './components/PortfolioForm';
import PortfolioPreview from './components/PortFolioPreview';
import {
  Container, CssBaseline, Box, Typography, AppBar,
  Toolbar, IconButton, Tooltip, Button, Avatar
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CodeIcon from '@mui/icons-material/Code';
import { useAuth } from './context/AuthContext';
import Login from './Login';      
import Signup from './Signup';     
import { useNavigate } from 'react-router-dom';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => (
    mode === 'light' ? lightTheme : darkTheme
  ), [mode]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent mode={mode} setMode={setMode} />
      </ThemeProvider>
    </Router>
  );
}

function AppContent({ mode, setMode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <AppBar position="fixed" color="primary" elevation={3}>
        <Toolbar>
          <CodeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AI Portfolio Builder
          </Typography>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={handleThemeToggle} color="inherit" sx={{ mr: 2 }}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          {user ? (
            <>
              <Avatar alt={user.email} src={user.photoURL} sx={{ mr: 2 }} />
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogin}>Login</Button>
              <Button color="inherit" onClick={handleSignup}>Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5, pt: 4 }}>
        <Routes>
          <Route path="/" element={<PortfolioForm />} />
          <Route path="/preview" element={<PortfolioPreview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Container>

      <Box sx={{ py: 4, mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} AI Portfolio Builder
        </Typography>
      </Box>
    </>
  );
}

export default App;
