import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { vehiclesApii } from '../AdminDashBoard/Slices/managevehiclesapi';
import { CarCardProps } from './types';
import { cloudinaryConfig } from '../../cloudinaryconfig';
import CarCard from './CardCard';

interface FormDataState {
  rental_rate: number;
  availability: boolean;
  vehicle_image: File | null;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
  vehicle_id?: number;
}

const ManageVehicles: React.FC = () => {
  const { data: vehicles = [], refetch } = vehiclesApii.useGetVehiclesQuery();
  const [addVehicle] = vehiclesApii.useAddVehicleMutation();
  const [deleteVehicle] = vehiclesApii.useDeleteVehicleMutation();
  const [updateVehicle] = vehiclesApii.useUpdateVehicleMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<FormDataState>({
    rental_rate: 0,
    availability: true,
    vehicle_image: null,
    manufacturer: '',
    model: '',
    year: 0,
    fuel_type: '',
    engine_capacity: '',
    transmission: '',
    seating_capacity: 0,
    color: '',
    features: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: type === 'number' ? parseFloat(value) : value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      if (formData.vehicle_image) {
        const formDataImage = new FormData();
        formDataImage.append('file', formData.vehicle_image);
        formDataImage.append('upload_preset', cloudinaryConfig.uploadPreset);

    
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudname}/image/upload`,
          formDataImage
        );

        if (response.status === 200) {
          imageUrl = response.data.secure_url;
        } else {
          console.error('Failed to upload image:', response.statusText);
          toast.error('Failed to upload image');
          return;
        }
      }

      const vehicleData = {
        vehicle: {
          rental_rate: formData.rental_rate,
          availability: formData.availability,
          vehicle_image: imageUrl,
        },
        vehicleSpec: {
          manufacturer: formData.manufacturer,
          model: formData.model,
          year: formData.year,
          fuel_type: formData.fuel_type,
          engine_capacity: formData.engine_capacity,
          transmission: formData.transmission,
          seating_capacity: formData.seating_capacity,
          color: formData.color,
          features: formData.features,
        },
      };

      await addVehicle(vehicleData).unwrap();
      refetch();
      toast.success('Vehicle added successfully');
      clearForm();
    } catch (error: any) {
      console.error('Error:', error.message);
      toast.error(error.message);
    }
  };

  const clearForm = () => {
    setFormData({
      rental_rate: 0,
      availability: true,
      vehicle_image: null,
      manufacturer: '',
      model: '',
      year: 0,
      fuel_type: '',
      engine_capacity: '',
      transmission: '',
      seating_capacity: 0,
      color: '',
      features: '',
    });
  };

  const handleDeleteVehicle = async (id: number) => {
    try {
      await deleteVehicle(id).unwrap();
      refetch();
      toast.success('Vehicle deleted successfully');
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      toast.error('Failed to delete vehicle');
    }
  };



  



  const handleUpdateVehicle = async (id: number) => {
    const vehicleToUpdate = vehicles.find((vehicle) => vehicle.vehicle_id === id);
  
    if (vehicleToUpdate) {
      try {
        let imageUrl = vehicleToUpdate.vehicle_image;
  
        // Handle image upload if a new image is selected
        if (formData.vehicle_image) {
          const formDataImage = new FormData();
          formDataImage.append('file', formData.vehicle_image);
          formDataImage.append('upload_preset', cloudinaryConfig.uploadPreset);
  
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudname}/image/upload`,
            formDataImage
          );
  
          if (response.status === 200) {
            imageUrl = response.data.secure_url;
          } else {
            console.error('Failed to upload image:', response.statusText);
            toast.error('Failed to upload image');
            return;
          }
        }
  
        // Prepare updated vehicle data
        const updatedVehicleData = {
          vehicleSpec: {
            manufacturer: formData.manufacturer || vehicleToUpdate.vehicleSpec.manufacturer,
            model: formData.model || vehicleToUpdate.vehicleSpec.model,
            year: formData.year || vehicleToUpdate.vehicleSpec.year,
            fuel_type: formData.fuel_type || vehicleToUpdate.vehicleSpec.fuel_type,
            engine_capacity: formData.engine_capacity || vehicleToUpdate.vehicleSpec.engine_capacity,
            transmission: formData.transmission || vehicleToUpdate.vehicleSpec.transmission,
            seating_capacity: formData.seating_capacity || vehicleToUpdate.vehicleSpec.seating_capacity,
            color: formData.color || vehicleToUpdate.vehicleSpec.color,
            features: formData.features || vehicleToUpdate.vehicleSpec.features,
          },
          vehicle: {
            rental_rate: formData.rental_rate || vehicleToUpdate.rental_rate,
            availability: formData.availability,
            vehicle_image: imageUrl,
          },
          vehicle_id: vehicleToUpdate.vehicle_id,
          vehicle_image: imageUrl,
          rental_rate: formData.rental_rate || vehicleToUpdate.rental_rate,
          availability: formData.availability,
        };
  
        console.log('Updated vehicle data:', updatedVehicleData);
  
        // Call the update API
        await updateVehicle({ id, updatedVehicle: updatedVehicleData }).unwrap();
        refetch();
        toast.success('Vehicle updated successfully');
        setIsModalOpen(false);
      } catch (error: any) {
        console.error('Error:', error.message);
        toast.error('Failed to update vehicle');
      }
    } else {
      toast.error('Vehicle not found');
    }
  };
  
  
  
  const handleOpenModal = (car: CarCardProps) => {
    setFormData({
      rental_rate: car.rental_rate,
      availability: car.availability,
      vehicle_image: null,
      manufacturer: car.vehicleSpec.manufacturer,
      model: car.vehicleSpec.model,
      year: car.vehicleSpec.year,
      fuel_type: car.vehicleSpec.fuel_type,
      engine_capacity: car.vehicleSpec.engine_capacity,
      transmission: car.vehicleSpec.transmission,
      seating_capacity: car.vehicleSpec.seating_capacity,
      color: car.vehicleSpec.color,
      features: car.vehicleSpec.features,
      vehicle_id: car.vehicle_id,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearForm();
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Manage Vehicles
      </Typography>
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6">Add New Vehicle</Typography>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <TextField
              label="Manufacturer"
              variant="outlined"
              fullWidth
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
            <TextField
              label="Model"
              variant="outlined"
              fullWidth
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              type="number"
              name="year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            />
            <TextField
              label="Fuel Type"
              variant="outlined"
              fullWidth
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
            />
            <TextField
              label="Engine Capacity"
              variant="outlined"
              fullWidth
              name="engine_capacity"
              value={formData.engine_capacity}
              onChange={handleChange}
            />
            <TextField
              label="Transmission"
              variant="outlined"
              fullWidth
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            />
            <TextField
              label="Seating Capacity"
              variant="outlined"
              fullWidth
              type="number"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={(e) => setFormData({ ...formData, seating_capacity: parseInt(e.target.value) })}
            />
            <TextField
              label="Color"
              variant="outlined"
              fullWidth
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
            <TextField
              label="Features"
              variant="outlined"
              fullWidth
              name="features"
              value={formData.features}
              onChange={handleChange}
            />
            <TextField
              label="Rental Rate"
              variant="outlined"
              fullWidth
              type="number"
              name="rental_rate"
              value={formData.rental_rate}
              onChange={(e) => setFormData({ ...formData, rental_rate: parseFloat(e.target.value) })}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                  name="availability"
                  color="primary"
                />
              }
              label="Available"
            />
            <TextField
              type="file"
              fullWidth
              name="vehicle_image"
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" className="col-span-1 sm:col-span-2">
              Add Vehicle
            </Button>
          </form>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Existing Vehicles
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {vehicles.map((vehicle) => (
          <CarCard
            key={vehicle.vehicle_id}
            {...vehicle}
            onDelete={() => handleDeleteVehicle(vehicle.vehicle_id)}
            onUpdate={() => handleOpenModal(vehicle)}
          />
        ))}
      </div>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Update Vehicle</DialogTitle>
        <DialogContent>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Manufacturer"
              variant="outlined"
              fullWidth
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
            <TextField
              label="Model"
              variant="outlined"
              fullWidth
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              type="number"
              name="year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            />
            <TextField
              label="Fuel Type"
              variant="outlined"
              fullWidth
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
            />
            <TextField
              label="Engine Capacity"
              variant="outlined"
              fullWidth
              name="engine_capacity"
              value={formData.engine_capacity}
              onChange={handleChange}
            />
            <TextField
              label="Transmission"
              variant="outlined"
              fullWidth
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            />
            <TextField
              label="Seating Capacity"
              variant="outlined"
              fullWidth
              type="number"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={(e) => setFormData({ ...formData, seating_capacity: parseInt(e.target.value) })}
            />
            <TextField
              label="Color"
              variant="outlined"
              fullWidth
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
            <TextField
              label="Features"
              variant="outlined"
              fullWidth
              name="features"
              value={formData.features}
              onChange={handleChange}
            />
            <TextField
              label="Rental Rate"
              variant="outlined"
              fullWidth
              type="number"
              name="rental_rate"
              value={formData.rental_rate}
              onChange={(e) => setFormData({ ...formData, rental_rate: parseFloat(e.target.value) })}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                  name="availability"
                  color="primary"
                />
              }
              label="Available"
            />
            <TextField
              type="file"
              fullWidth
              name="vehicle_image"
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleUpdateVehicle(formData.vehicle_id as number)}
            color="primary"
            variant="contained"
          >
            Update Vehicle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageVehicles;

