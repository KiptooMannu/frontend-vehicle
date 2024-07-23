import React, { useState } from 'react';
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
  Dialog, DialogActions, DialogContent, TextField, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {
  useFetchLocationsQuery, useAddLocationMutation, useUpdateLocationMutation, useDeleteLocationMutation
} from './Slices/locationapi';
import { Location } from './types';

type LocationForCreation = Omit<Location, 'location_id' | 'contact_phone'>;

const Locations: React.FC = () => {
  const { data: locations, error, isLoading: isLocationsLoading, refetch } = useFetchLocationsQuery();
  const [addLocation, { isLoading: isAddLocationLoading }] = useAddLocationMutation();
  const [updateLocation, { isLoading: isUpdateLocationLoading }] = useUpdateLocationMutation();
  const [deleteLocation, { isLoading: isDeleteLocationLoading }] = useDeleteLocationMutation();

  const [open, setOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Partial<LocationForCreation> | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const DEFAULT_CONTACT_PHONE = 'N/A'; // Set a default contact phone

  const handleOpen = (location?: Location) => {
    if (location) {
      setEditingLocation(location);
    } else {
      setEditingLocation({ name: '', address: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLocation(null);
  };

  const handleSave = async () => {
    if (editingLocation) {
      setLoading(true);
      try {
        if ('location_id' in editingLocation && editingLocation.location_id !== undefined) {
          // Editing existing location
          const updatedLocation = { ...editingLocation, contact_phone: DEFAULT_CONTACT_PHONE };
          await updateLocation(updatedLocation as Location).unwrap();
          setSnackbarMessage('Location updated successfully!');
        } else {
          // Adding new location
          const newLocation = { ...editingLocation, contact_phone: DEFAULT_CONTACT_PHONE };
          await addLocation(newLocation as LocationForCreation).unwrap();
          setSnackbarMessage('Location added successfully!');
        }
        setSnackbarOpen(true);
        handleClose();
        await refetch();
      } catch (error: any) {
        console.error('Failed to save location:', error);
        if (typeof error === 'object' && error !== null && 'data' in error) {
          console.error('Server responded with:', error.data);
          let errorMessage = 'Failed to save location';
          if (typeof error.data === 'string') {
            errorMessage = error.data;
          } else if (error.data.error) {
            errorMessage = error.data.error;
          }
          setSnackbarMessage(errorMessage);
        } else {
          setSnackbarMessage('Failed to save location');
        }
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (location_id: number) => {
    setLoading(true);
    try {
      await deleteLocation(location_id).unwrap();
      setSnackbarMessage('Location deleted successfully!');
      setSnackbarOpen(true);
      await refetch();
    } catch (error) {
      console.error('Failed to delete location:', error);
      setSnackbarMessage('Failed to delete location');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4">Manage Locations</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ my: 2 }}
        onClick={() => handleOpen()}
        disabled={loading}
      >
        {isAddLocationLoading ? <CircularProgress size={24} /> : 'Add Location'}
      </Button>
      {isLocationsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography>Error loading locations</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Contact Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations?.map((location) => (
                <TableRow key={location.location_id}>
                  <TableCell>{location.location_id}</TableCell>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>{location.contact_phone}</TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(location)}
                      disabled={loading}
                      sx={{ mr: 1 }}
                    >
                      {isUpdateLocationLoading ? <CircularProgress size={24} /> : 'Edit'}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(location.location_id)}
                      disabled={loading}
                      sx={{ mr: 1 }}
                    >
                      {isDeleteLocationLoading ? <CircularProgress size={24} /> : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {editingLocation && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={editingLocation?.name || ''}
              onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Address"
              fullWidth
              value={editingLocation?.address || ''}
              onChange={(e) => setEditingLocation({ ...editingLocation, address: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" disabled={loading}>Cancel</Button>
            <Button onClick={handleSave} color="primary" disabled={loading}>
              {isUpdateLocationLoading || isAddLocationLoading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Locations;
