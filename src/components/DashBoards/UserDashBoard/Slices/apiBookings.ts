import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Booking } from "./types";
// import { localDomain } from '../../utils';
import { localDomain } from '../domains';

export const bookingsApi = createApi({
    reducerPath: "bookingsApi",
    baseQuery: fetchBaseQuery({ baseUrl: localDomain }),
    tagTypes: ["Booking"],
    endpoints: (builder) => ({
        getBookings: builder.query<Booking[], void>({
        query: () => "api/bookings",
        providesTags: ["Booking"],
        }),
        getBooking: builder.query<Booking, number>({
        query: (userId) => `api/bookings/users/${userId}`,
        providesTags: [{ type: "Booking", id: "LIST" }],
        }),
        addBooking: builder.mutation<Booking, Partial<Booking>>({
        query: (booking) => ({
            url: "api/bookings",
            method: "POST",
            body: booking,
        }),
        transformResponse: (response: any) => {
            console.log('Booking response:', response); // Debugging line
            return response; // Ensure this matches the Booking type
          },
        invalidatesTags: ["Booking"],
        }),
        deleteBooking: builder.mutation<void, number>({
        query: (bookingId) => ({
            url: `api/bookings/${bookingId}`,
            method: "DELETE",
        }),
        invalidatesTags: ["Booking"],
        }),
        updateBookingStatus: builder.mutation<Booking, { id: number, status: string }>({
        query: ({ id, status }) => ({
            url: `api/bookings/${id}/status`,
            method: "PUT",
            body: { status },
        }),
        })
    }),
    });