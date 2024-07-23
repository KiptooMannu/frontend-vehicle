import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SupportTicket } from '../types';

const BASE_URL = 'https://vehicle-management-backend.onrender.com';

export const supportTicketsApi = createApi({
  reducerPath: 'supportTicketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['SupportTicket'],
  endpoints: (builder) => ({
    fetchSupportTickets: builder.query<SupportTicket[], void>({
      query: () => '/api/customer-support-tickets',
      providesTags: ['SupportTicket'],
    }),
    addSupportTicket: builder.mutation<SupportTicket, Partial<SupportTicket>>({
      query: (newTicket) => ({
        url: '/api/customer-support-tickets',
        method: 'POST',
        body: newTicket,
      }),
      invalidatesTags: ['SupportTicket'],
    }),
    updateSupportTicket: builder.mutation<SupportTicket, SupportTicket>({
      query: (updatedTicket) => ({
        url: `/api/customer-support-tickets/${updatedTicket.ticket_id}`,
        method: 'PUT',
        body: updatedTicket,
      }),
      invalidatesTags: ['SupportTicket'],
    }),
    deleteSupportTicket: builder.mutation<void, number>({
      query: (ticketId) => ({
        url: `/api/customer-support-tickets/${ticketId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SupportTicket'],
    }),
  }),
});

type UseFetchSupportTicketsQuery = typeof supportTicketsApi.endpoints.fetchSupportTickets.useQuery;
type UseAddSupportTicketMutation = typeof supportTicketsApi.endpoints.addSupportTicket.useMutation;
type UseUpdateSupportTicketMutation = typeof supportTicketsApi.endpoints.updateSupportTicket.useMutation;
type UseDeleteSupportTicketMutation = typeof supportTicketsApi.endpoints.deleteSupportTicket.useMutation;

export const useFetchSupportTicketsQuery: UseFetchSupportTicketsQuery = supportTicketsApi.endpoints.fetchSupportTickets.useQuery;
export const useAddSupportTicketMutation: UseAddSupportTicketMutation = supportTicketsApi.endpoints.addSupportTicket.useMutation;
export const useUpdateSupportTicketMutation: UseUpdateSupportTicketMutation = supportTicketsApi.endpoints.updateSupportTicket.useMutation;
export const useDeleteSupportTicketMutation: UseDeleteSupportTicketMutation = supportTicketsApi.endpoints.deleteSupportTicket.useMutation;

export default supportTicketsApi;
