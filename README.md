CarHub Booking Website - Client Side
Overview
CarHub is a vehicle booking platform that allows users to browse, book, and manage vehicle rentals. This README provides an overview of the client-side architecture and features of the CarHub booking website, including details about the technologies used, key components, and how to get started.

Technologies Used
React: A JavaScript library for building user interfaces.
Redux: State management library for managing application state.
RTK Query: Data fetching and caching tool for Redux.
Tailwind CSS: Utility-first CSS framework for styling.
Material-UI: React components library for a modern UI.
Stripe: Payment processing platform.
Day.js: Lightweight date library for handling date and time.
React-Toastify: Library for displaying toast notifications.
Vite: Fast build tool for modern web projects.
Project Structure
Key Components
UserDashboard: The main dashboard for authenticated users. Includes:

Sidenav: Navigation component for accessing different parts of the dashboard.
Navbar: Header component for user interactions and site navigation.
BookingForm: Component for creating vehicle bookings. Allows users to select start and end dates, choose a pickup location, and initiate payment through Stripe.

ManageUsers: Component for managing users. Displays user profiles and allows administrators to disable users.

APIs
Bookings API: Handles booking creation and management.
Locations API: Provides location data for vehicle pickups.
Payments API: Manages payment transactions via Stripe.
Users API: Manages user data and operations.
Components Breakdown
BookingForm

State Management: Manages booking details (start date, end date, location) and handles payment initiation.
Date Handling: Uses Day.js for date calculations.
Stripe Integration: Facilitates payment processing and redirects users to the Stripe checkout page.
ManageUsers

User Management: Displays user profiles in a card layout, showing details like name, email, contact, and address.
Delete User: Provides functionality for administrators to disable users.
Getting Started
Prerequisites
Node.js and pnpm (or Yarn) installed on your machine.
Access to environment variables for API keys and endpoints.
