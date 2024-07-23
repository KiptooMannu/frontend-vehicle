import React from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';

interface CheckoutButtonProps {
  booking: any;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ booking, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleClick = async () => {
    if (!stripe || !elements) return;

    try {
      const response = await fetch('https://vehicle-management-backend.onrender.com/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      const { checkout_url } = await response.json();

      const { error } = await stripe.redirectToCheckout({ sessionId: checkout_url });

      if (error) {
        // Provide a default message if error.message is undefined
        onError(error.message || 'An unknown error occurred during payment.');
      } else {
        onSuccess();
      }
    } catch (error) {
      onError('Error processing payment');
    }
  };

  return (
    <Button onClick={handleClick} color="primary" variant="contained">
      Proceed to Payment
    </Button>
  );
};

export default CheckoutButton;
