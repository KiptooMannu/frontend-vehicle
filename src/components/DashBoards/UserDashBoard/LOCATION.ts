import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Location} from './Slices/types'

export const locationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://vehicle-management-backend.onrender.com/api' }),
    tagTypes: ['Location'],
    endpoints: (builder) => ({
      getLocations: builder.query<Location[], void>({
        query: () => '/locations',
        providesTags: ['Location'],
      }),
      getLocation: builder.query<Location, number>({
        query: (id) => `/locations/${id}`,
        providesTags: [{type: 'Location', id: "LIST"}],
      }),
      addLocation: builder.mutation<Location, Partial<Location>>({
        query: (newLocation) => ({
          url: '/locations',
          method: 'POST',
          body: newLocation,
        }),
        invalidatesTags: [{type: 'Location', id: "LIST"}],
      }),
      updateLocation: builder.mutation<Location,{id: number, updatedLocation: Partial<Location>}>({
        query: ({id,updatedLocation}) => ({
          url: `/locations/${id}`,
          method: 'PUT',
          body: updatedLocation,
        }),
        invalidatesTags: [{type: 'Location', id: "LIST"}],
      }),
      deleteLocation: builder.mutation<void, number>({
        query: (id) => ({
          url: `/locations/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{type: 'Location', id: "LIST"}],
      }),
    }),
})