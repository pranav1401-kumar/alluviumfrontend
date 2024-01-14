import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Link, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true); 

      const registrationResponse = await registerUser(userData);

      if (registrationResponse && registrationResponse.error) {
        setError('Registration failed: ' + registrationResponse.error);
        console.error('Registration failed:', registrationResponse.error);
      } else {
        console.log('Registration successful:', registrationResponse);
        navigate('/login');
      }
    } catch (error) {
      setError('Registration failed: ' + error.message);
      console.error('Registration failed:', error.message);
    } finally {
      setLoading(false); 
    }
  };

  const handleLoginLink = () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="xs" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleRegister} style={{ width: '100%', marginTop: '20px' }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Full Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          {error && <Typography color="error" sx={{ marginTop: '10px' }}>{error}</Typography>}
        </form>
        <Typography variant="body2" sx={{ marginTop: '20px' }}>
          Already have an account? <Link onClick={handleLoginLink}>Login here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
