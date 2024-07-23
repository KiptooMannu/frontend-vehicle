import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Container, CircularProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation'; // New icon for cars
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // New icon for payments
import GroupIcon from '@mui/icons-material/Group'; // New icon for users
import MapIcon from '@mui/icons-material/Map'; // New icon for locations
import EventNoteIcon from '@mui/icons-material/EventNote'; // New icon for tickets
import BookIcon from '@mui/icons-material/Book'; // New icon for bookings

const AdminOverview: React.FC = () => {
  const theme = useTheme();
  const [data, setData] = useState({
    bookings: 0,
    payments: 0,
    users: 0,
    cars: 0,
    locations: 0,
    tickets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('https://vehicle-management-backend.onrender.com/api/bookings'),
          fetch('https://vehicle-management-backend.onrender.com/api/payments'),
          fetch('https://vehicle-management-backend.onrender.com/api/users'),
          fetch('https://vehicle-management-backend.onrender.com/api/vehicles'),
          fetch('https://vehicle-management-backend.onrender.com/api/locations'),
          fetch('https://vehicle-management-backend.onrender.com/api/customer-support-tickets'),
        ]);
        const results = await Promise.all(responses.map(res => res.json()));
        setData({
          bookings: results[0].length,
          payments: results[1].length,
          users: results[2].length,
          cars: results[3].length,
          locations: results[4].length,
          tickets: results[5].length,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="2rem"
        padding="1rem"
        borderRadius="8px"
        boxShadow={`0 4px 8px ${theme.palette.grey[400]}`}
        bgcolor="#fff"
      >
        <Typography variant="h4" component="h1">
          Admin Dashboard Overview
        </Typography>
        <Box>
          {/* Placeholder for potential header controls */}
        </Box>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4}>
          <Card style={{ borderLeft: `5px solid ${theme.palette.primary.main}`, borderRadius: '8px' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ backgroundColor: theme.palette.primary.main, padding: '8px' }}>
                    <EmojiTransportationIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" component="h2" style={{ fontWeight: 600 }}>
                    Total Cars
                  </Typography>
                  <Typography color="textSecondary">
                    {data.cars}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card style={{ borderLeft: `5px solid ${theme.palette.secondary.main}`, borderRadius: '8px' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ backgroundColor: theme.palette.secondary.main, padding: '8px' }}>
                    <AttachMoneyIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" component="h2" style={{ fontWeight: 600 }}>
                    Total Payments
                  </Typography>
                  <Typography color="textSecondary">
                    {data.payments}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card style={{ borderLeft: `5px solid ${theme.palette.primary.main}`, borderRadius: '8px' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ backgroundColor: theme.palette.primary.main, padding: '8px' }}>
                    <GroupIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" component="h2" style={{ fontWeight: 600 }}>
                    Total Users
                  </Typography>
                  <Typography color="textSecondary">
                    {data.users}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card style={{ borderLeft: `5px solid ${theme.palette.secondary.main}`, borderRadius: '8px' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ backgroundColor: theme.palette.secondary.main, padding: '8px' }}>
                    <MapIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" component="h2" style={{ fontWeight: 600 }}>
                    Total Locations
                  </Typography>
                  <Typography color="textSecondary">
                    {data.locations}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card style={{ borderLeft: `5px solid ${theme.palette.primary.main}`, borderRadius: '8px' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ backgroundColor: theme.palette.primary.main, padding: '8px' }}>
                    <EventNoteIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" component="h2" style={{ fontWeight: 600 }}>
                    Total Tickets
                  </Typography>
                  <Typography color="textSecondary">
                    {data.tickets}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card style={{ borderLeft: `5px solid ${theme.palette.secondary.main}`, borderRadius: '8px' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ backgroundColor: theme.palette.secondary.main, padding: '8px' }}>
                    <BookIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" component="h2" style={{ fontWeight: 600 }}>
                    Total Bookings
                  </Typography>
                  <Typography color="textSecondary">
                    {data.bookings}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminOverview;
