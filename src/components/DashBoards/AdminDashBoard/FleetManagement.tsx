import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  useFetchFleetQuery,
  useAddFleetMutation,
  useUpdateFleetMutation,
  useDeleteFleetMutation,
} from './Slices/fleetapi'; // Adjust import as necessary
import { Fleet } from './types';

type FleetForCreation = Omit<Fleet, 'fleet_id'>;

const FleetManagement: React.FC = () => {
  const { data: fleet, error, isLoading, refetch } = useFetchFleetQuery();
  const [addFleet, { isLoading: isAddFleetLoading }] = useAddFleetMutation();
  const [updateFleet, { isLoading: isUpdateFleetLoading }] = useUpdateFleetMutation();
  const [deleteFleet, { isLoading: isDeleteFleetLoading }] = useDeleteFleetMutation();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingFleet, setEditingFleet] = useState<Partial<FleetForCreation> | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOpenEditDialog = (fleet: Fleet) => {
    setEditingFleet(fleet);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingFleet(null);
  };

  const handleAddFleet = async (newFleet: FleetForCreation) => {
    setLoading(true);
    try {
      await addFleet(newFleet);
      setSnackbarMessage('Fleet added successfully!');
      setSnackbarOpen(true);
      handleCloseEditDialog();
      await refetch();
    } catch (error) {
      console.error('Failed to add fleet:', error);
      setSnackbarMessage('Failed to add fleet');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFleet = async (fleet: FleetForCreation) => {
    setLoading(true);
    try {
      const response = await updateFleet(fleet as Fleet);
      console.log('Update Fleet Response:', response); // Log the response for debugging
      setSnackbarMessage('Fleet updated successfully!');
      setSnackbarOpen(true);
      handleCloseEditDialog();
      await refetch();
    } catch (error: any) {
      console.error('Failed to update fleet:', error);
      let errorMessage = 'Failed to update fleet';
      if (error.data) {

        if (typeof error.data === 'string') {
          errorMessage = error.data;
        } else if (error.data.error) {
          errorMessage = error.data.error;
        }
      }
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteFleet = async (fleetId: number) => {
    setLoading(true);
    try {
      await deleteFleet(fleetId).unwrap();
      setSnackbarMessage('Fleet deleted successfully!');
      setSnackbarOpen(true);
      await refetch();
    } catch (error) {
      console.error('Failed to delete fleet:', error);
      setSnackbarMessage('Failed to delete fleet');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  const handleAddButtonClick = () => {
    setOpenEditDialog(true);
  };

  const handleSaveFleet = async (fleetData: FleetForCreation) => {
    if (editingFleet) {
      await handleUpdateFleet({ ...editingFleet, ...fleetData });
    } else {
      await handleAddFleet(fleetData);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4">Fleet Management</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ my: 2 }}
        onClick={handleAddButtonClick}
        disabled={loading}
      >
        {isAddFleetLoading ? <CircularProgress size={24} /> : 'Add Fleet'}
      </Button>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error loading fleet</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fleet_Id</TableCell>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Acquisition Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Maintenance Cost</TableCell>
                <TableCell>Depreciation Rate</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fleet?.map((fleetItem) => (
                <TableRow key={fleetItem.fleet_id}>
                  <TableCell>{fleetItem.fleet_id}</TableCell>
                  <TableCell>{fleetItem.vehicle_id}</TableCell>
                  <TableCell>{fleetItem.acquisition_date}</TableCell>
                  <TableCell>{fleetItem.status}</TableCell>
                  <TableCell>{fleetItem.maintenance_cost}</TableCell>
                  <TableCell>{fleetItem.depreciation_rate}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenEditDialog(fleetItem)}
                      disabled={loading}
                    >
                      {isUpdateFleetLoading ? <CircularProgress size={22} /> : 'Edit'}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteFleet(fleetItem.fleet_id)}
                      sx={{ ml: 1 }}
                      disabled={loading}
                    >
                      {isDeleteFleetLoading ? <CircularProgress size={22} /> : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Fleet Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="vehicle_id"
            label="Vehicle ID"
            type="number"
            fullWidth
            value={editingFleet?.vehicle_id || ''}
            onChange={(e) => setEditingFleet({ ...editingFleet, vehicle_id: +e.target.value })}
          />
          <TextField
            margin="dense"
            id="acquisition_date"
            label="Acquisition Date"
            type="date"
            fullWidth
            value={editingFleet?.acquisition_date || ''}
            onChange={(e) => setEditingFleet({ ...editingFleet, acquisition_date: e.target.value })}
          />
          <TextField
            margin="dense"
            id="status"
            label="Status"
            fullWidth
            value={editingFleet?.status || ''}
            onChange={(e) => setEditingFleet({ ...editingFleet, status: e.target.value })}
          />
          <TextField
            margin="dense"
            id="maintenance_cost"
            label="Maintenance Cost"
            type="number"
            fullWidth
            value={editingFleet?.maintenance_cost || ''}
            onChange={(e) => setEditingFleet({ ...editingFleet, maintenance_cost: +e.target.value })}
          />
          <TextField
            margin="dense"
            id="depreciation_rate"
            label="Depreciation Rate"
            type="number"
            fullWidth
            value={editingFleet?.depreciation_rate || ''}
            onChange={(e) => setEditingFleet({ ...editingFleet, depreciation_rate: +e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={() => handleSaveFleet(editingFleet as FleetForCreation)} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FleetManagement;
