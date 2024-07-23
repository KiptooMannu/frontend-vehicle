import React, { useState } from 'react';
import { Box, Typography, Button, Container, Snackbar, Alert } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MyTickets from './Mytickets';
import BookVehicle from './BookTheVehicles';
import BookingHistory from './BookingHistory';
import AccountSettings from './account';

const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleNavigation = (component: React.ReactNode) => {
    setActiveComponent(component);
  };

  const handleBack = () => {
    setActiveComponent(null);
  };

  const handleSnackbarClose = () => {
    setSuccessMessage(null);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh', 
          p: 3, 
          backgroundImage: 'url(https://i.pinimg.com/474x/6c/c8/91/6cc89177662c8a8ea3939c6877ffdda0.jpg)', // Replace with your image URL
          backgroundSize: 'cover', 
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
        }}
      >
        {activeComponent ? (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleBack}
              >
                Back to Dashboard
              </Button>
            </Box>
            {activeComponent}
          </Box>
        ) : (
          <>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ mb: 4, textAlign: 'center', color: '#fff' }}
            >
              Welcome to the User Dashboard!
            </Typography>
            
            <Typography 
              variant="body1" 
              gutterBottom 
              sx={{ mb: 4, textAlign: 'center', color: '#fff' }}
            >
              Here’s what you can do:
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                width: '100%', 
                alignItems: 'center', 
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Add a semi-transparent background
                p: 3,
                borderRadius: 2,
              }}
            >
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<DirectionsCarIcon />} 
                onClick={() => handleNavigation(<BookVehicle />)}
                sx={{ width: '100%' }}
              >
                Book a Vehicle
              </Button>
              
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<ListAltIcon />} 
                onClick={() => handleNavigation(<BookingHistory />)}
                sx={{ width: '100%' }}
              >
                View Booking History
              </Button>

              <Button 
                variant="contained" 
                color="info" 
                startIcon={<AssignmentIcon />} 
                onClick={() => handleNavigation(<MyTickets />)}
                sx={{ width: '100%' }}
              >
                File a Complaint
              </Button>
              
              <Button 
                variant="contained" 
                color="success" 
                startIcon={<AccountCircleIcon />} 
                onClick={() => handleNavigation(<AccountSettings />)}
                sx={{ width: '100%' }}
              >
                Change Account Settings
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Dashboard;
