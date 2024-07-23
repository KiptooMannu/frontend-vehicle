import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CarCardProps, VehicleSpec } from './types';

const BASE_URL = 'http://localhost:8000';


export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Vehicle', 'VehicleSpecs'], 
  endpoints: (builder) => ({
    getVehicles: builder.query<CarCardProps[], void>({
      query: () => '/api/combined',
      providesTags: ['Vehicle'], 
    }),
    getVehicleSpecs: builder.query<VehicleSpec[], void>({
      query: () => '/vehiclespecs',
      providesTags: ['VehicleSpecs'], 
    }),
    getCombinedVehiclesWithSpecifications: builder.query<CarCardProps[], void>({
      query: () => '/api/combined',
      providesTags: ['Vehicle', 'VehicleSpecs'], 
    }),
  }),
});

// Define types for useGetVehiclesQuery, useGetVehicleSpecsQuery, and useGetCombinedVehiclesWithSpecificationsQuery
type UseGetVehiclesQuery = typeof vehiclesApi.endpoints.getVehicles.useQuery;
type UseGetVehicleSpecsQuery = typeof vehiclesApi.endpoints.getVehicleSpecs.useQuery;
type UseGetCombinedVehiclesWithSpecificationsQuery = typeof vehiclesApi.endpoints.getCombinedVehiclesWithSpecifications.useQuery;

// Export hooks with their types
export const useGetVehiclesQuery: UseGetVehiclesQuery = vehiclesApi.endpoints.getVehicles.useQuery;
export const useGetVehicleSpecsQuery: UseGetVehicleSpecsQuery = vehiclesApi.endpoints.getVehicleSpecs.useQuery;
export const useGetCombinedVehiclesWithSpecificationsQuery: UseGetCombinedVehiclesWithSpecificationsQuery =
  vehiclesApi.endpoints.getCombinedVehiclesWithSpecifications.useQuery;
