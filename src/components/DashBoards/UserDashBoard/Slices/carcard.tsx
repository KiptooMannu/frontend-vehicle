import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, styled } from '@mui/material';
import { CarCardProps } from './types';
import carImage from '../../../../assets/images/car image.webp';

const StyledCard = styled(Card)({
  maxWidth: 345,
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
});

const CardMedia = styled('img')({
  height: 140,
  objectFit: 'cover',
});

const CarCard: React.FC<CarCardProps> = ({ vehicle_image, rental_rate, availability, vehicleSpec, onBookClick }) => {
  return (
    <StyledCard variant="outlined">
      <CardMedia src={vehicle_image || carImage} alt={vehicleSpec ? `${vehicleSpec.manufacturer} ${vehicleSpec.model}` : 'Vehicle'} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '1.5rem', lineHeight: '2rem' }}>
          {vehicleSpec ? `${vehicleSpec.manufacturer} ${vehicleSpec.model}` : 'Unknown Vehicle'}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
          Rental Rate: {rental_rate}
        </Typography>
        <Typography variant="body2" color={availability ? 'green' : 'red'} style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
          Availability: {availability ? 'Available' : 'Not Available'}
        </Typography>
        {vehicleSpec && (
          <>
            <Typography variant="body2" color="text.secondary" style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
              Year: {vehicleSpec.year}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
              Fuel Type: {vehicleSpec.fuel_type}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
              Engine Capacity: {vehicleSpec.engine_capacity}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
              Transmission: {vehicleSpec.transmission}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
              Seating Capacity: {vehicleSpec.seating_capacity}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
              Color: {vehicleSpec.color}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
              Features: {vehicleSpec.features}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onBookClick} disabled={!availability}>
          {availability ? 'Book' : 'Not Available for Booking'}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default CarCard;
