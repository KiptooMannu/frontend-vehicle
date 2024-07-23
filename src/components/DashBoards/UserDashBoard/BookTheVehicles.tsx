import React, { useState, useEffect } from 'react';
import { CarCardProps } from './Slices/types';
import CarCard from './Slices/carcard';
import { useGetCombinedVehiclesWithSpecificationsQuery } from './Slices/apislice';
import { ClipLoader } from 'react-spinners';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box,
  Snackbar, SnackbarContent
} from '@mui/material';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import carImage from '../../../assets/images/car image.webp'; 
import { styled } from '@mui/system';
import { locationApi } from './LOCATION';
import { paymentApi } from './Slices/paymentsApi';
import { bookingsApi } from './Slices/apiBookings'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';








const stripePromise = loadStripe('pk_test_51PbJt2DCaCRrBDN9JDhg6tno1Va2kCyCSjiEAFoaRwfSRafu2VRevSyI84JGwVrXtWRXybqZoMtmW134wvE6xJGt00m45tNU5L');

const StyledCarCard = styled('div')(() => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const CustomSnackbarContent = React.forwardRef<HTMLDivElement, { message: string; onClose: () => void; icon: JSX.Element; success: boolean }>(
  ({ message, onClose, icon, success }, ref) => (
    <SnackbarContent
      ref={ref}
      style={{
        backgroundColor: success ? 'green' : 'red',
        color: 'white',
        fontSize: '1.2rem',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      message={
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          <span style={{ marginLeft: 8 }}>{message}</span>
        </span>
      }
      action={
        <Button color="inherit" onClick={onClose}>Close</Button>
      }
    />
  )
);

const VehicleList: React.FC = () => {
  const { data: locations } = locationApi.useGetLocationsQuery();
  const { data: combinedData, error, isLoading } = useGetCombinedVehiclesWithSpecificationsQuery();
  const [selectedVehicle, setSelectedVehicle] = useState<CarCardProps | null>(null);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>(''); 
  const [locationId, setLocationId] = useState<number | undefined>(undefined);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isProcessingBooking, setIsProcessingBooking] = useState<boolean>(false);

  const [createPayment] = paymentApi.useAddPaymentMutation();
  const [createBooking] = bookingsApi.useAddBookingMutation();
  const [updateBookingStatus] = bookingsApi.useUpdateBookingStatusMutation();

  const handleBookButtonClick = (vehicle: CarCardProps) => {
    if (vehicle.availability) {
      setSelectedVehicle(vehicle);
      setBookingFormOpen(true);
    } else {
      setBookingError('The vehicle is already booked for those days by someone else. Try another car or different dates.');
    }
  };

  const handleCloseBookingForm = () => {
    setBookingFormOpen(false);
    setSelectedVehicle(null);
    setBookingError(null);
    setBookingDate('');
    setReturnDate('');
    setLocationId(undefined); 
    setTotalAmount(null);
  };

  const calculateNumberOfDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return Math.ceil(daysDiff);
  };

  useEffect(() => {
    if (selectedVehicle && bookingDate && returnDate) {
      const numberOfDays = calculateNumberOfDays(bookingDate, returnDate);
      const total = selectedVehicle.rental_rate * numberOfDays;
      setTotalAmount(total);
    } else {
      setTotalAmount(null);
    }
  }, [selectedVehicle, bookingDate, returnDate]);

  const handleBookingSubmit = async () => {
    setIsProcessingBooking(true);
    setBookingError(null);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.user_id;

    if (!userId) {
      setBookingError('User ID not found in localStorage');
      setIsProcessingBooking(false);
      return;
    }

    if (!selectedVehicle) {
      setBookingError('Please select a vehicle.');
      setIsProcessingBooking(false);
      return;
    }

    if (locationId === undefined || isNaN(locationId)) {
      setBookingError('Please select a valid location.');
      setIsProcessingBooking(false);
      return;
    }

    if (!bookingDate || !returnDate) {
      setBookingError('Please select both pickup and return dates.');
      setIsProcessingBooking(false);
      return;
    }

    try {
      const bookingData = await createBooking({
        user_id: userId,
        vehicle_id: Number(selectedVehicle.vehicle_id),
        booking_date: bookingDate,
        return_date: returnDate,
        location_id: Number(locationId),
        total_amount: totalAmount !== null ? totalAmount : undefined,
      }).unwrap();
      console.log('Booking Data:', bookingData);

      if (!bookingData.booking_id) {
        throw new Error('Booking ID is not available');
      }

      setBookingSuccess(true);
      handleMakePayment(bookingData.booking_id, totalAmount || 0);
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      setBookingError(error.message || 'The vehicle is already booked for those days <br> by someone else. Try another car or different dates');
    } finally {
      setIsProcessingBooking(false);
    }
  };

  const handleMakePayment = async (bookingId: number, amount: number) => {
    try {
      const res = await createPayment({ booking_id: bookingId, total_amount: amount }).unwrap();
      toast.success('Payment initiated successfully');
      console.log('Payment response:', res);
      if (res.url) {
        window.location.href = res.url;
      } else {
        const stripe = await stripePromise;
        if (stripe && res.transaction_id) {
          const { error } = await stripe.redirectToCheckout({ sessionId: res.transaction_id });
          if (error) {
            console.error('Error redirecting to checkout:', error);
            toast.error('Error redirecting to checkout');
            await updateBookingStatus({ id: bookingId, status: 'Cancelled' }).unwrap();
          } else {
            await updateBookingStatus({ id: bookingId, status: 'Completed' }).unwrap();
            window.location.href = '/payment-success';
          }
        }
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Error initiating payment');
      await updateBookingStatus({ id: bookingId, status: 'Cancelled' }).unwrap();
    }
  };

  if (isLoading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#f00" size={150} />
      </div>
    );
  if (error) return <div>Error: Error Fetching</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {combinedData?.map((car: CarCardProps) => (
          <StyledCarCard key={car.vehicle_id}>
            <CarCard
              vehicle_id={car.vehicle_id}
              vehicle_image={car.vehicle_image || carImage}
              rental_rate={car.rental_rate}
              availability={car.availability}
              vehicleSpec={car.vehicleSpec}
              onBookClick={() => handleBookButtonClick(car)}
            />
          </StyledCarCard>
        ))}
      </div>
      <Dialog open={bookingFormOpen} onClose={handleCloseBookingForm}>
        <DialogTitle>Book Vehicle</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px', padding: '20px' }}>
            <TextField
              label="Pickup Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              fullWidth
            />
            <TextField
              label="Return Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              fullWidth
            />
            <TextField
              select
              label="Location"
              value={locationId}
              onChange={(e) => setLocationId(Number(e.target.value))}
              fullWidth
              SelectProps={{ native: true }}
            >
              <option value="">Select a location</option>
              {locations?.map((location) => (
                <option key={location.location_id} value={location.location_id}>
                  {location.name}
                </option>
              ))}
            </TextField>
            <div style={{ marginTop: '16px', fontSize: '1.2rem' }}>Total Amount: ${totalAmount !== null ? totalAmount : 'N/A'}</div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBookingForm}>Cancel</Button>
          <Button
            onClick={handleBookingSubmit}
            color="primary"
            disabled={isProcessingBooking}
            startIcon={isProcessingBooking ? <ClipLoader size={24} color="white" /> : undefined}
          >
            {isProcessingBooking ? 'Processing...' : 'Book Now'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!bookingError}
        autoHideDuration={6000}
        onClose={() => setBookingError(null)}
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1300 }}
      >
        <CustomSnackbarContent
          message={bookingError || ''}
          onClose={() => setBookingError(null)}
          icon={<ErrorOutline />}
          success={false}
        />
      </Snackbar>
      <Snackbar
        open={bookingSuccess}
        autoHideDuration={6000}
        onClose={() => setBookingSuccess(false)}
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1300 }}
      >
        <CustomSnackbarContent
          message="Booking successful!"
          onClose={() => setBookingSuccess(false)}
          icon={<CheckCircle />}
          success={true}
        />
      </Snackbar>
    </div>
  );
};

export default VehicleList;
