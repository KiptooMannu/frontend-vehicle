import React, { useState } from 'react';
import { useCreateTicketMutation } from './Slices/ticketsapi';
import { TextField, Button, Box, CircularProgress, Snackbar, Alert } from '@mui/material';

const NewTicket: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [createTicket, { isLoading, isSuccess, isError }] = useCreateTicketMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      await createTicket({ subject, description });
      setSuccessMessage('Ticket created successfully');
      setSubject('');
      setDescription('');
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <Box>
      <TextField
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
      <Snackbar
        open={isSuccess || !!successMessage}
        autoHideDuration={1500}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      {isError && <Alert severity="error">Error creating ticket</Alert>}
    </Box>
  );
};

export default NewTicket;
