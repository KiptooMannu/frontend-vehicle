import React from 'react';
import { useGetTicketsQuery, useDeleteTicketMutation } from './Slices/ticketsapi';
import { CircularProgress, List, ListItem, ListItemText, Button, Box } from '@mui/material';

const MyTickets: React.FC = () => {
  const { data: tickets, error, isLoading } = useGetTicketsQuery();
  const [deleteTicket] = useDeleteTicketMutation();

  const handleDelete = async (ticketId: number) => {
    try {
      await deleteTicket(ticketId);
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading tickets</div>;

  return (
    <List>
      {tickets?.map((ticket) => (
        <ListItem key={ticket.ticket_id}>
          <ListItemText primary={ticket.subject} secondary={ticket.description} />
          <Box>
            <Button variant="contained" color="primary" onClick={() => handleDelete(ticket.ticket_id)}>
              Delete
            </Button>
            {/* Add an update button with a link or handle function */}
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default MyTickets;
