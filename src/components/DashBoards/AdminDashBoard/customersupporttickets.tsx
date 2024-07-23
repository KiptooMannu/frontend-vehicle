import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Dialog, DialogActions, DialogContent, TextField, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useFetchSupportTicketsQuery, useAddSupportTicketMutation, useUpdateSupportTicketMutation, useDeleteSupportTicketMutation } from './Slices/supportticketapi'; // Adjust import as necessary
import { SupportTicket } from './types';

type TicketForCreation = Omit<SupportTicket, 'ticket_id'>;

const CustomerSupportTickets: React.FC = () => {
  const { data: tickets, error, isLoading, refetch } = useFetchSupportTicketsQuery();
  const [addTicket, { isLoading: isAddTicketLoading }] = useAddSupportTicketMutation();
  const [updateTicket, { isLoading: isUpdateTicketLoading }] = useUpdateSupportTicketMutation();
  const [deleteTicket, { isLoading: isDeleteTicketLoading }] = useDeleteSupportTicketMutation();

  const [open, setOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Partial<TicketForCreation> | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = (ticket?: SupportTicket) => {
    if (ticket) {
      setEditingTicket(ticket);
    } else {
      setEditingTicket({ user_id: 0, subject: '', description: '', status: 'Open' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTicket(null);
  };

  const handleSave = async () => {
    if (editingTicket) {
      setLoading(true);
      try {
        if ('ticket_id' in editingTicket && editingTicket.ticket_id) {
          await updateTicket(editingTicket as SupportTicket).unwrap();
          setSnackbarMessage('Ticket updated successfully!');
        } else {
          await addTicket(editingTicket).unwrap();
          setSnackbarMessage('Ticket added successfully!');
        }
        setSnackbarOpen(true);
        handleClose();
        await refetch();
      } catch (error) {
        console.error('Failed to save ticket:', error);
        setSnackbarMessage('Failed to save ticket');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (ticket_id: number) => {
    setLoading(true);
    try {
      await deleteTicket(ticket_id).unwrap();
      setSnackbarMessage('Ticket deleted successfully!');
      setSnackbarOpen(true);
      await refetch();
    } catch (error) {
      console.error('Failed to delete ticket:', error);
      setSnackbarMessage('Failed to delete ticket');
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
      <Typography variant="h4">Customer Support Tickets</Typography>
      <Button variant="contained" color="primary" sx={{ my: 2 }} onClick={() => handleOpen()} disabled={loading}>
        {isAddTicketLoading ? <CircularProgress size={24} /> : 'Add Ticket'}
      </Button>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error loading support tickets</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets?.map((ticket) => (
                <TableRow key={ticket.ticket_id}>
                  <TableCell>{ticket.ticket_id}</TableCell>
                  <TableCell>{ticket.user_id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.description}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(ticket)}
                      disabled={loading}
                    >
                      {isUpdateTicketLoading ? <CircularProgress size={22} /> : 'Edit'}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(ticket.ticket_id)}
                      sx={{ ml: 1 }}
                      disabled={loading}
                    >
                      {isDeleteTicketLoading ? <CircularProgress size={22} /> : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {editingTicket && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="User ID"
              fullWidth
              value={editingTicket?.user_id || ''}
              onChange={(e) => setEditingTicket({ ...editingTicket, user_id: Number(e.target.value) })}
            />
            <TextField
              margin="dense"
              label="Subject"
              fullWidth
              value={editingTicket?.subject || ''}
              onChange={(e) => setEditingTicket({ ...editingTicket, subject: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={editingTicket?.description || ''}
              onChange={(e) => setEditingTicket({ ...editingTicket, description: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Status"
              fullWidth
              value={editingTicket?.status || ''}
              onChange={(e) => setEditingTicket({ ...editingTicket, status: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" disabled={loading}>Cancel</Button>
            <Button onClick={handleSave} color="primary" disabled={loading || isAddTicketLoading || isUpdateTicketLoading}>
              {loading ? <CircularProgress size={24} /> : 'Save'}
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

export default CustomerSupportTickets;
