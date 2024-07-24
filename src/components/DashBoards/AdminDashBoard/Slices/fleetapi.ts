import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Fleet } from '../types';

const BASE_URL = 'http://localhost:8000/';

export const fleetApi = createApi({
  reducerPath: 'fleetApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Fleet'],
  endpoints: (builder) => ({
    fetchFleet: builder.query<Fleet[], void>({
      query: () => 'api/fleet-management',
      providesTags: ['Fleet'],
    }),
    addFleet: builder.mutation<Fleet, Partial<Fleet>>({
      query: (newFleet) => ({
        url: 'api/fleet-management',
        method: 'POST',
        body: newFleet,
      }),
      invalidatesTags: ['Fleet'],
    }),
    deleteFleet: builder.mutation<void, number>({
      query: (fleetId) => ({
        url: `api/fleet-management/${fleetId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fleet'],
    }),
    updateFleet: builder.mutation<Fleet, Partial<Fleet>>({
      query: (updatedFleet) => ({
        url: `api/fleet-management/${updatedFleet.fleet_id}`,
        method: 'PUT',
        body: updatedFleet,
      }),
      invalidatesTags: ['Fleet'],
    }),
  }),
});

type UseFetchFleetQuery = typeof fleetApi.endpoints.fetchFleet.useQuery;
type UseAddFleetMutation = typeof fleetApi.endpoints.addFleet.useMutation;
type UseDeleteFleetMutation = typeof fleetApi.endpoints.deleteFleet.useMutation;
type UseUpdateFleetMutation = typeof fleetApi.endpoints.updateFleet.useMutation;

export const useFetchFleetQuery: UseFetchFleetQuery = fleetApi.endpoints.fetchFleet.useQuery;
export const useAddFleetMutation: UseAddFleetMutation = fleetApi.endpoints.addFleet.useMutation;
export const useDeleteFleetMutation: UseDeleteFleetMutation = fleetApi.endpoints.deleteFleet.useMutation;
export const useUpdateFleetMutation: UseUpdateFleetMutation = fleetApi.endpoints.updateFleet.useMutation;

