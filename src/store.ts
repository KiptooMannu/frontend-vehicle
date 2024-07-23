import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './AuthApi';
import { bookingsApi } from './components/DashBoards/UserDashBoard/Slices/apiBookings';
import { vehiclesApi } from './components/DashBoards/UserDashBoard/Slices/apislice';
import { ticketsApi } from './components/DashBoards/UserDashBoard/Slices/ticketsapi';
import { fleetApi } from './components/DashBoards/AdminDashBoard/Slices/fleetapi';
import { locationsApi } from './components/DashBoards/AdminDashBoard/Slices/locationapi';
import { supportTicketsApi } from './components/DashBoards/AdminDashBoard/Slices/supportticketapi';
import { usersApi } from './components/DashBoards/AdminDashBoard/Slices/Userapi';
import { vehiclesApii } from './components/DashBoards/AdminDashBoard/Slices/managevehiclesapi';
import { locationApi } from './components/DashBoards/UserDashBoard/LOCATION';
import { paymentApi } from './components/DashBoards/UserDashBoard/Slices/paymentsApi';
import { dashboardApi } from './components/DashBoards/AdminDashBoard/Slices/DashBoardapi'; // Import your new API slice

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    [vehiclesApii.reducerPath]: vehiclesApii.reducer,
    [fleetApi.reducerPath]: fleetApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [supportTicketsApi.reducerPath]: supportTicketsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer, // Add the new API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      bookingsApi.middleware,
      vehiclesApi.middleware,
      ticketsApi.middleware,
      fleetApi.middleware,
      locationsApi.middleware,
      supportTicketsApi.middleware,
      usersApi.middleware,
      vehiclesApii.middleware,
      locationApi.middleware,
      paymentApi.middleware,
      dashboardApi.middleware // Add the new API slice middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;