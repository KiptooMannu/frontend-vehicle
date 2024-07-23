// src/components/DashBoards/AdminDashBoard/AdminDashboardLayout.tsx
import React, { useState } from 'react';
import { Box, Grid, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, IconButton, Menu, MenuItem, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';

// Import the new DashboardSummary component
import DashboardSummary from './Slices/Dashboard';
import ManageVehicles from './managevehicle';
import ManageUsers from './manageuser';
import Reports from './reports';
import Locations from './location';
import CustomerSupportTickets from './customersupporttickets';
import FleetManagement from './FleetManagement';

const drawerWidth = 240;

interface AdminDashboardLayoutProps {}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = () => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<DashboardSummary />);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNavigation = (component: React.ReactNode) => {
    setActiveComponent(component);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Admin logged out');
    setSuccessMessage('Logout successful');
    setAnchorEl(null);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const handleSnackbarClose = () => {
    setSuccessMessage(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => handleNavigation(<DashboardSummary />)}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation(<ManageVehicles />)}>
              <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
              <ListItemText primary="Manage Vehicles" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation(<ManageUsers />)}>
              <ListItemIcon><ListAltIcon /></ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation(<Reports />)}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation(<Locations />)}>
              <ListItemIcon><AddCircleIcon /></ListItemIcon>
              <ListItemText primary="Locations" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation(<CustomerSupportTickets />)}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Customer Support Tickets" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation(<FleetManagement />)}>
              <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
              <ListItemText primary="Fleet Management" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {activeComponent}
          </Grid>
        </Grid>
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
    </Box>
  );
};

export default AdminDashboardLayout;
