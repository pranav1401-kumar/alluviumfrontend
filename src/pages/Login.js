import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterinLink = () => {
    navigate('/registerpage');
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      setError('');
      const userData = await loginUser(credentials);
      
     
      if (userData && userData.error) {
        setError('Invalid email or password');
        console.error('Login failed:', userData.error);
      } else {
        console.log('Login successful:', userData);
        
        setUser(userData);
        
        
        const userId = userData.userId;
        console.log('Setting userId in state:', userId);
        navigate('/movies');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login failed:', error.message);
      
    }
  };
  

  return (
    <Container component="main" maxWidth="xs" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%', marginTop: '20px' }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }}>
            Sign In
          </Button>
          {error && <Typography color="error" sx={{ marginTop: '10px' }}>{error}</Typography>}
        </form>
        <Typography variant="body2" sx={{ marginTop: '20px' }}>
          Don't have an account? <Link onClick={handleRegisterinLink}>Register here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
