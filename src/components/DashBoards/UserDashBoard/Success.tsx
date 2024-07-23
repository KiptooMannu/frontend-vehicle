// SuccessPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnToDashboard = () => {
    navigate('/user/dashboard');
  };

  const handleViewBookingHistory = () => {
    navigate('/user/dashboard/BookingHistory');
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your booking has been confirmed.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleReturnToDashboard}
        sx={{ marginTop: '40px', marginRight: '20px' }}
      >
        Return to Dashboard
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleViewBookingHistory}
        sx={{ marginTop: '40px' }}
      >
        View Booking History
      </Button>
    </Box>
  );
};

export default SuccessPage;
