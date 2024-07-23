import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://vehicle-management-backend.onrender.com';

// Define types for the dashboard data
type TotalBookings = { count: number };
type TotalRevenue = { amount: number };
type TotalUsers = { count: number };
type TotalLocations = { count: number };
type TotalPayments = { count: number };
type TotalPaymentsAmount = { amount: number };
type BookingsByStatus = { status: string; count: number }[];
type BookingsByUser = { userId: number; count: number }[];
type BookingsByVehicleType = { vehicleType: string; count: number }[];

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    getTotalBookings: builder.query<TotalBookings, void>({
      query: () => '/api/dashboard/total-bookings',
    }),
    getTotalRevenue: builder.query<TotalRevenue, void>({
      query: () => '/api/dashboard/total-revenue',
    }),
    getTotalUsers: builder.query<TotalUsers, void>({
      query: () => '/api/dashboard/total-users',
    }),
    getTotalLocations: builder.query<TotalLocations, void>({
      query: () => '/api/dashboard/total-locations',
    }),
    getTotalPayments: builder.query<TotalPayments, void>({
      query: () => '/api/dashboard/total-payments',
    }),
    getTotalPaymentsAmount: builder.query<TotalPaymentsAmount, void>({
      query: () => '/api/dashboard/total-payments-amount',
    }),
    getBookingsByStatus: builder.query<BookingsByStatus, void>({
      query: () => '/api/dashboard/bookings-by-status',
    }),
    getBookingsByUser: builder.query<BookingsByUser, void>({
      query: () => '/api/dashboard/bookings-by-user',
    }),
    getBookingsByVehicleType: builder.query<BookingsByVehicleType, void>({
      query: () => '/api/dashboard/bookings-by-vehicle-type',
    }),
  }),
});


type UseGetTotalBookingsQuery = typeof dashboardApi.endpoints.getTotalBookings.useQuery;
type UseGetTotalRevenueQuery = typeof dashboardApi.endpoints.getTotalRevenue.useQuery;
type UseGetTotalUsersQuery = typeof dashboardApi.endpoints.getTotalUsers.useQuery;
type UseGetTotalLocationsQuery = typeof dashboardApi.endpoints.getTotalLocations.useQuery;
type UseGetTotalPaymentsQuery = typeof dashboardApi.endpoints.getTotalPayments.useQuery;
type UseGetTotalPaymentsAmountQuery = typeof dashboardApi.endpoints.getTotalPaymentsAmount.useQuery;
type UseGetBookingsByStatusQuery = typeof dashboardApi.endpoints.getBookingsByStatus.useQuery;
type UseGetBookingsByUserQuery = typeof dashboardApi.endpoints.getBookingsByUser.useQuery;
type UseGetBookingsByVehicleTypeQuery = typeof dashboardApi.endpoints.getBookingsByVehicleType.useQuery;

// Export hooks for use in components
export const useGetTotalBookingsQuery: UseGetTotalBookingsQuery = dashboardApi.endpoints.getTotalBookings.useQuery;
export const useGetTotalRevenueQuery: UseGetTotalRevenueQuery = dashboardApi.endpoints.getTotalRevenue.useQuery;
export const useGetTotalUsersQuery: UseGetTotalUsersQuery = dashboardApi.endpoints.getTotalUsers.useQuery;
export const useGetTotalLocationsQuery: UseGetTotalLocationsQuery = dashboardApi.endpoints.getTotalLocations.useQuery;
export const useGetTotalPaymentsQuery: UseGetTotalPaymentsQuery = dashboardApi.endpoints.getTotalPayments.useQuery;
export const useGetTotalPaymentsAmountQuery: UseGetTotalPaymentsAmountQuery = dashboardApi.endpoints.getTotalPaymentsAmount.useQuery;
export const useGetBookingsByStatusQuery: UseGetBookingsByStatusQuery = dashboardApi.endpoints.getBookingsByStatus.useQuery;
export const useGetBookingsByUserQuery: UseGetBookingsByUserQuery = dashboardApi.endpoints.getBookingsByUser.useQuery;
export const useGetBookingsByVehicleTypeQuery: UseGetBookingsByVehicleTypeQuery = dashboardApi.endpoints.getBookingsByVehicleType.useQuery;
