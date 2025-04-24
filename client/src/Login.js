import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in:", userCredential.user);
            navigate('/'); 
        } catch (err) {
            setError(err.message);
            console.error("Error signing in:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            console.log("User signed in with Google:", userCredential.user);
            navigate('/'); 
        } catch (err) {
            setError(err.message);
            console.error("Error signing in with Google:", err);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh" 
            padding={2}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    maxWidth: 400,
                    width: '100%',
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.background.paper, 
                }}
            >
                <Typography variant="h5" align="center" gutterBottom sx={{ color: theme.palette.text.primary }}>
                    Sign In
                </Typography>
                <form onSubmit={handleSignIn}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    {error && (
                        <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                </form>

                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={handleGoogleSignIn}
                    sx={{ mt: 2 }}
                >
                    Sign In with Google
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 2, color: theme.palette.text.secondary }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
