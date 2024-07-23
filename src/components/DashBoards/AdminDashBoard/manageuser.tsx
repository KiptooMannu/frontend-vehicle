import React, { useState } from 'react';
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
  Dialog, DialogActions, DialogContent, TextField, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {
  useFetchUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation
} from './Slices/Userapi'; // Adjust import as necessary
import { User } from './types';

type UserForCreation = Omit<User, 'user_id'> & { password: string };

const ManageUsers: React.FC = () => {
  const { data: users, error, isLoading: isUsersLoading, refetch } = useFetchUsersQuery();
  const [addUser, { isLoading: isAddUserLoading }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdateUserLoading }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleteUserLoading }] = useDeleteUserMutation();

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<UserForCreation> | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = (user?: User) => {
    if (user) {
      setEditingUser({ ...user, password: '' });
    } else {
      setEditingUser({ full_name: '', email: '', contact_phone: '', address: '', role: 'user', password: '123456' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleSave = async () => {
    if (editingUser) {
      setLoading(true);
      try {
        if ('user_id' in editingUser && editingUser.user_id) {
          const { password, ...userWithoutPassword } = editingUser as User;
          await updateUser({ ...userWithoutPassword, password: password || undefined }).unwrap();
          setSnackbarMessage('User updated successfully!');
        } else {
          const { password, ...userWithoutPassword } = editingUser as UserForCreation;
          await addUser({ ...userWithoutPassword, password }).unwrap();
          setSnackbarMessage('User added successfully!');
        }
        setSnackbarOpen(true);
        handleClose();
        await refetch();
      } catch (error) {
        console.error('Failed to save user:', error);
        setSnackbarMessage('Failed to save user');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleDelete = async (user_id: number) => {
    setLoading(true);
    try {
      await deleteUser(user_id).unwrap();
      setSnackbarMessage('User deleted successfully!');
      setSnackbarOpen(true);
      await refetch();
    } catch (error) {
      console.error('Failed to delete user:', error);
      setSnackbarMessage('Failed to delete user');
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
      <Typography variant="h4">Manage Users</Typography>
      <Button variant="contained" color="primary" sx={{ my: 2 }} onClick={() => handleOpen()} disabled={loading}>
        {isAddUserLoading ? <CircularProgress size={24} /> : 'Add User'}
      </Button>
      {isUsersLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography>Error loading users</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contact_phone}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleOpen(user)}
                      variant="outlined"
                      sx={{ color: 'green', borderColor: 'green', mr: 1 }}
                      disabled={loading}
                    >
                      {isUpdateUserLoading ? <CircularProgress size={22} /> : 'Edit'}
                    </Button>
                    <Button
                      onClick={() => handleDelete(user.user_id)}
                      variant="outlined"
                      sx={{ color: 'red', borderColor: 'red' }}
                      disabled={loading}
                    >
                      {isDeleteUserLoading ? <CircularProgress size={22} /> : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {editingUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              fullWidth
              value={editingUser?.full_name || ''}
              onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={editingUser?.email || ''}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Contact Phone"
              fullWidth
              value={editingUser?.contact_phone || ''}
              onChange={(e) => setEditingUser({ ...editingUser, contact_phone: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Address"
              fullWidth
              value={editingUser?.address || ''}
              onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Role"
              fullWidth
              value={editingUser?.role || 'user'}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={editingUser.password || ''}
              onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" disabled={loading}>Cancel</Button>
            <Button onClick={handleSave} color="primary" disabled={loading || isAddUserLoading || isUpdateUserLoading}>
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

export default ManageUsers;
