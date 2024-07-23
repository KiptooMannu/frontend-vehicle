import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

interface VehicleSpec {
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
}

interface CarCardProps {
  vehicle_id: number;
  vehicle_image: string;
  rental_rate: number;
  availability: boolean;
  vehicleSpec?: VehicleSpec | null;
  onUpdate: (vehicle_id: number) => void;
  onDelete: (vehicle_id: number) => void;
}

const CarCard: React.FC<CarCardProps> = ({
  vehicle_id,
  vehicle_image,
  rental_rate,
  availability,
  vehicleSpec,
  onUpdate,
  onDelete
}) => {
  const {
    manufacturer = 'Unknown Manufacturer',
    model = 'Unknown Model',
    year = new Date().getFullYear(),
    fuel_type = 'Unknown Fuel Type',
    engine_capacity = 'Unknown Engine Capacity',
    transmission = 'Unknown Transmission',
    seating_capacity = 0,
    color = 'Unknown Color',
    features = 'No Features'
  } = vehicleSpec || {}; // Default to empty object if vehicleSpec is null or undefined

  return (
    <Card sx={{ maxWidth: 345, mb: 4 }}>
      <CardMedia
        component="img"
        height="140"
        image={vehicle_image}
        alt={`${manufacturer} ${model}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {manufacturer} {model} ({year})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${rental_rate} / Day
        </Typography>
        <Typography variant="body2" color={availability ? 'success.main' : 'error.main'}>
          {availability ? 'Available' : 'Not Available'}
        </Typography>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            <strong>Transmission:</strong> {transmission}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Fuel Type:</strong> {fuel_type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Engine Capacity:</strong> {engine_capacity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Seating Capacity:</strong> {seating_capacity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Color:</strong> {color}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Features:</strong> {features}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button variant="contained" color="primary" onClick={() => onUpdate(vehicle_id)}>
          Update
        </Button>
        <Button variant="contained" color="error" onClick={() => onDelete(vehicle_id)}>
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default CarCard;
