import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

interface StripePaymentProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
  totalAmount: number;
}

const CardElementContainer = styled('div')({
  padding: '15px 10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginBottom: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
});

const StyledButton = styled(Button)({
  marginTop: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
});

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    width: '600px', // Increase width
    height: '80vh', // Increase height
    maxHeight: '80vh', // Set a maximum height
  },
});

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  height: '100%', // Ensure the form takes the full height of the dialog
});

const StripePayment: React.FC<StripePaymentProps> = ({ open, onClose, onSuccess, onError, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    
    // Fetch the client secret from your backend
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: totalAmount * 100 }), // totalAmount in cents
    });
    const { clientSecret } = await response.json();
    
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
      },
    });
    
    setLoading(false);
    if (error) {
      onError(error.message || 'An unexpected error occurred');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    } else {
      onError('Payment did not succeed.');
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <FormContainer onSubmit={handleSubmit}>
          <CardElementContainer>
            <CardElement options={{ hidePostalCode: true }} />
          </CardElementContainer>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={!stripe || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Pay'}
          </StyledButton>
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default StripePayment;
