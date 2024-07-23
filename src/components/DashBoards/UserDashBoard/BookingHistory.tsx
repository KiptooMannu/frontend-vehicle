import { bookingsApi } from "../UserDashBoard/Slices/apiBookings";
import { Booking } from "./Slices/types";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Box 
} from '@mui/material';

const BookingHistory = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && typeof user.user_id === 'number') {
      setUserId(user.user_id);
    } else {
      console.error('User ID not found or is not a number in localStorage');
    }
  }, []);

  const { data: bookings, error, isLoading } = bookingsApi.useGetBookingQuery(userId ?? 0) as { data: Booking[] | undefined, error: any, isLoading: boolean };
  console.log(bookings);

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <ClipLoader color="#f00" size={150} />
    </Box>
  );

  if (error) return <div>Error: Failed to fetch booking history</div>;

  return (
    <Box p={4} bgcolor="white" borderRadius="8px" boxShadow={3}>
      <Typography variant="h4" gutterBottom>Booking History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Vehicle Manufacturer</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings?.map((booking: Booking) => (
              <TableRow key={booking.booking_id}>
                <TableCell>{booking.booking_id}</TableCell>
                <TableCell>{booking.vehicle?.vehicleSpec?.manufacturer || 'N/A'}</TableCell>
                <TableCell>{booking.location?.name || 'N/A'}</TableCell>
                <TableCell>{new Date(booking.booking_date).toLocaleString()}</TableCell>
                <TableCell>{new Date(booking.return_date).toLocaleString()}</TableCell>
                <TableCell>${booking.total_amount}</TableCell>
                <TableCell>
                  <Box 
                    component="span" 
                    sx={{
                      px: 2, 
                      py: 0.5, 
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      color: booking.payments?.payment_status === 'Completed' ? 'green' : booking.payments?.payment_status === 'Refunded' ? 'red' : 'GREEN.100',
                      backgroundColor: booking.payments?.payment_status === 'Completed' ? 'green.100' : booking.payments?.payment_status === 'Refunded' ? 'red.100' : 'GREEN.100',
                    }}
                  >
                    {booking.payments?.payment_status || 'N/A'}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookingHistory;





































// import { bookingsApi } from "../UserDashBoard/Slices/apiBookings";
// import { Booking } from "./Slices/types";
// import { useState, useEffect } from "react";
// import { ClipLoader } from "react-spinners";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Paper, 
//   Typography,
//   Box 
// } from '@mui/material';

// const BookingHistory = () => {
//   const [userId, setUserId] = useState<number | null>(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (user && typeof user.user_id === 'number') {
//       setUserId(user.user_id);
//     } else {
//       console.error('User ID not found or is not a number in localStorage');
//     }
//   }, []);

//   const { data: bookings, error, isLoading } = bookingsApi.useGetBookingQuery(userId ?? 0) as { data: Booking[] | undefined, error: any, isLoading: boolean };
//   console.log(bookings);

//   if (isLoading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//       <ClipLoader color="#f00" size={150} />
//     </Box>
//   );

//   if (error) return <div>Error: Failed to fetch booking history</div>;

//   return (
//     <Box p={4} bgcolor="white" borderRadius="8px" boxShadow={3}>
//       <Typography variant="h4" gutterBottom>Booking History</Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Booking ID</TableCell>
//               <TableCell>Vehicle Manufacturer</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Booking Date</TableCell>
//               <TableCell>Return Date</TableCell>
//               <TableCell>Total Amount</TableCell>
//               <TableCell>Payment Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {bookings?.map((booking: Booking) => (
//               <TableRow key={booking.booking_id}>
//                 <TableCell>{booking.booking_id}</TableCell>
//                 <TableCell>{booking.vehicle?.vehicleSpec?.manufacturer || 'N/A'}</TableCell>
//                 <TableCell>{booking.location?.name || 'N/A'}</TableCell>
//                 <TableCell>{new Date(booking.booking_date).toLocaleString()}</TableCell>
//                 <TableCell>{new Date(booking.return_date).toLocaleString()}</TableCell>
//                 <TableCell>${booking.total_amount}</TableCell>
//                 <TableCell>
//                   <Box 
//                     component="span" 
//                     sx={{
//                       px: 2, 
//                       py: 0.5, 
//                       borderRadius: '12px',
//                       fontWeight: 'bold',
//                       color: booking.payments.payment_status === 'Completed' ? 'green' : booking.payments.payment_status === 'Refunded' ? 'red' : 'yellow',
//                       backgroundColor: booking.payments.payment_status === 'Completed' ? 'green.100' : booking.payments.payment_status === 'Refunded' ? 'red.100' : 'yellow.100',
//                     }}
//                   >
//                     {booking.payments.payment_status}
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default BookingHistory;















