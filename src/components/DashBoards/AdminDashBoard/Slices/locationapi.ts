import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Location } from '../types';

const BASE_URL = 'https://vehicle-management-backend.onrender.com';

export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Location'],
  endpoints: (builder) => ({
    fetchLocations: builder.query<Location[], void>({
      query: () => '/api/locations',
      providesTags: ['Location'],
    }),
    addLocation: builder.mutation<Location, Partial<Location>>({
      query: (newLocation) => ({
        url: '/api/locations',
        method: 'POST',
        body: newLocation,
      }),
      invalidatesTags: ['Location'],
    }),
    updateLocation: builder.mutation<Location, Partial<Location>>({
      query: ({ location_id, ...patch }) => ({
        url: `/api/locations/${location_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Location'],
    }),
    deleteLocation: builder.mutation<void, number>({
      query: (locationId) => ({
        url: `/api/locations/${locationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Location'],
    }),
  }),
});

// Define types for hook usage
type UseFetchLocationsQuery = typeof locationsApi.endpoints.fetchLocations.useQuery;
type UseAddLocationMutation = typeof locationsApi.endpoints.addLocation.useMutation;
type UseUpdateLocationMutation = typeof locationsApi.endpoints.updateLocation.useMutation;
type UseDeleteLocationMutation = typeof locationsApi.endpoints.deleteLocation.useMutation;

// Export hooks for use in components
export const useFetchLocationsQuery: UseFetchLocationsQuery = locationsApi.endpoints.fetchLocations.useQuery;
export const useAddLocationMutation: UseAddLocationMutation = locationsApi.endpoints.addLocation.useMutation;
export const useUpdateLocationMutation: UseUpdateLocationMutation = locationsApi.endpoints.updateLocation.useMutation;
export const useDeleteLocationMutation: UseDeleteLocationMutation = locationsApi.endpoints.deleteLocation.useMutation;
