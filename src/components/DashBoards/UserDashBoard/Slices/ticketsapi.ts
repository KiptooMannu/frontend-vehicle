import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CustomerSupportTicket } from '../Slices/types';

const BASE_URL = 'https://vehicle-management-backend.onrender.com';

export const ticketsApi = createApi({
  reducerPath: 'ticketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTickets: builder.query<CustomerSupportTicket[], void>({
      query: () => 'api/customer-support-tickets',
    }),
    createTicket: builder.mutation<CustomerSupportTicket, Partial<CustomerSupportTicket>>({
      query: (newTicket) => ({
        url: 'api/customer-support-tickets',
        method: 'POST',
        body: newTicket,
      }),
    }),
    deleteTicket: builder.mutation<void, number>({
      query: (ticketId) => ({
        url: `/api/customer-support-tickets/${ticketId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Types for hooks
type UseGetTicketsQuery = typeof ticketsApi.endpoints.getTickets.useQuery;
type UseCreateTicketMutation = typeof ticketsApi.endpoints.createTicket.useMutation;
type UseDeleteTicketMutation = typeof ticketsApi.endpoints.deleteTicket.useMutation;

export const useGetTicketsQuery: UseGetTicketsQuery = ticketsApi.endpoints.getTickets.useQuery;
export const useCreateTicketMutation: UseCreateTicketMutation = ticketsApi.endpoints.createTicket.useMutation;
export const useDeleteTicketMutation: UseDeleteTicketMutation = ticketsApi.endpoints.deleteTicket.useMutation;
