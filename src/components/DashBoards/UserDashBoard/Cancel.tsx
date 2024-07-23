// src/pages/Cancel.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const Cancel: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        padding: '50px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      <CancelIcon 
        sx={{ 
          fontSize: '100px', 
          color: 'error.main', 
          marginBottom: '20px' 
        }} 
      />
      <Typography variant="h3" gutterBottom>
        Payment Canceled
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your booking was not completed. Please try again later.
      </Typography>
      <ErrorOutlineIcon 
        sx={{ 
          fontSize: '60px', 
          color: 'text.secondary', 
          marginTop: '20px', 
          marginBottom: '20px' 
        }} 
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGoHome}
        sx={{ 
          marginTop: '40px' 
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default Cancel;
