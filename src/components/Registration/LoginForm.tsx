import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, CircularProgress, Snackbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLoginMutation } from '../../AuthApi'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';

const theme = createTheme();

function SignIn() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Log the current localStorage state for debugging
    console.log('Current localStorage state:', {
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user'),
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    try {
      console.log('Attempting login with', { username, password });
      const response = await login({ username, password }).unwrap();
      
      console.log('Login response:', response);

      const { token, user } = response;

      // Debug: Check if token and user are present
      if (!token || !user) {
        throw new Error('Token or user data missing from response');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Log the new localStorage state for verification
      console.log('Updated localStorage state:', {
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user'),
      });

      setShowSuccessMessage(true);
      setOpenSnackbar(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        setOpenSnackbar(false);

        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }, 2000); 
    } catch (error) {
      console.error('Failed to login:', error);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ mb: 6 }}>
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {showSuccessMessage && (
            <Box mt={2} display="flex" alignItems="center">
              <CheckCircleIcon sx={{ color: green[500], marginRight: 1 }} />
              <Typography variant="body1" color="textPrimary">
                Login Successful!
              </Typography>
            </Box>
          )}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Login failed. Please try again."
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
