import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CarCardProps } from '../../AdminDashBoard/types';
// import { localDomain } from '../../utils';
import { localDomain } from '../../../../components/DashBoards/UserDashBoard/domains';

export const vehiclesApii = createApi({
  reducerPath: 'vehiclesApii',
  baseQuery: fetchBaseQuery({ baseUrl: localDomain }),
  tagTypes: ['Vehicle'],
  endpoints: (builder) => ({
    getVehicles: builder.query<CarCardProps[], void>({
      query: () => '/api/combined',
      providesTags: ['Vehicle'],
    }),
    getVehicle: builder.query<CarCardProps, number>({
      query: (id) => `/vehicles/specs/${id}`,
      providesTags: [{ type: 'Vehicle', id: 'LIST' }],
    }),
    addVehicle: builder.mutation<CarCardProps, Partial<CarCardProps>>({
      query: (newVehicle) => ({
        url: '/api/addvehicles',
        method: 'POST',
        body: newVehicle,
      }),
      invalidatesTags: [{ type: 'Vehicle', id: 'LIST' }],
    }),
    updateVehicle: builder.mutation<CarCardProps, { id: number, updatedVehicle: CarCardProps }>({
      query: ({ id, updatedVehicle }) => ({
        url: `api/putvehicles/${id}`,
        method: 'PUT',
        body: updatedVehicle,
      }),
      invalidatesTags: [{ type: 'Vehicle', id: 'LIST' }],
    }),
    deleteVehicle: builder.mutation<void, number>({
      query: (vehicleId) => ({
        url: `api/vehicles/${vehicleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Vehicle', id: 'LIST' }],
    }),
  }),
});

