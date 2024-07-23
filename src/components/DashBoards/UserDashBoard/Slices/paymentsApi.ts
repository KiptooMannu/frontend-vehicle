import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { localDomain } from '../domains';
// import { prodDomain } from '../domains';

export interface TPayment {
    booking_id: number;
    total_amount: number;
    payment_status: string;
    payment_date: string;
    payment_method: string;
    transaction_id: string;
    created_at: string;
    updated_at: string;
    url: string;
  }

  export const paymentApi = createApi({
    reducerPath: 'paymentsApi',
    baseQuery: fetchBaseQuery({baseUrl:localDomain}),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        getPayments: builder.query<TPayment[], void>({
            query: () => 'api/payments',
            providesTags: ['Payment']
        }),
        getPayment: builder.query<TPayment, number>({
            query: (booking_id) => `api/payments/${booking_id}`,
            providesTags: [{type: 'Payment', id: 'LIST'}]
        }),
        addPayment: builder.mutation<TPayment, Partial<TPayment>>({
            query: (newPayment) => ({
                url: 'api/checkout-session',
                method: 'POST',
                body: newPayment
            }),
            invalidatesTags: ['Payment']
        }),
        updatePayment: builder.mutation<TPayment, {id: number, updatedPayment: Partial<TPayment>}>({
            query: ({id, updatedPayment}) => ({
                url: `api/payments/${id}`,
                method: 'PUT',
                body: updatedPayment
            }),
            invalidatesTags: ['Payment']
        }),
        deletePayment: builder.mutation<void, number>({
            query: (id) => ({
                url: `api/payments/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Payment']
        })
    })
  })