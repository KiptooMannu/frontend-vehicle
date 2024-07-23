
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Cars from './components/Cars/cars'
// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection/Herosection';
import ServicesSection from './components/ServiceSection/Service';
import ContactSection from './components/Contact/Contact';
import WhyChoose from './components/WhyChooseUs/choose';
import About from './components/AboutUs/About';
import SignIn from './components/Registration/LoginForm';
import SignUp from './components/Registration/RegisterForm';
import DashboardLayout from './components/DashBoards/UserDashBoard/UserDashBoardLayout';
import Dashboard from './components/DashBoards/UserDashBoard/Dashboard';
import BookTheVehicles from './components/DashBoards/UserDashBoard/BookTheVehicles';
import BookingHistory from './components/DashBoards/UserDashBoard/BookingHistory';
import MyTickets from './components/DashBoards/UserDashBoard/Mytickets';
import NewTicket from './components/DashBoards/UserDashBoard/NewTicket';
import AdminDashboardLayout from './components/DashBoards/AdminDashBoard/admin.dash';
import ManageVehicles from './components/DashBoards/AdminDashBoard/managevehicle';
import ManageUsers from './components/DashBoards/AdminDashBoard/manageuser';
import Reports from './components/DashBoards/AdminDashBoard/reports';
import Locations from './components/DashBoards/AdminDashBoard/location';
import CustomerSupportTickets from './components/DashBoards/AdminDashBoard/customersupporttickets';
import FleetManagement from './components/DashBoards/AdminDashBoard/FleetManagement';
import SuccessPage from './components/DashBoards/UserDashBoard/Success';
import Cancel from './components/DashBoards/UserDashBoard/Cancel';

// Load Stripe with your public key
const stripePromise = loadStripe('your-public-key-here');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <About />
              <Cars/>
              <WhyChoose />
              <ServicesSection />
              <ContactSection />
            </>
          } />
          <Route path="/services" element={<ServicesSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/dashboard/*" element={
            <DashboardLayout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="booked-vehicles" element={<BookTheVehicles />} />
                <Route path="BookingHistory" element={<BookingHistory />} />
                <Route path="my-tickets" element={<MyTickets />} />
                <Route path="new-ticket" element={<NewTicket />} />
              </Routes>
            </DashboardLayout>
          } />
          <Route path="/admin/dashboard/*" element={
            <AdminDashboardLayout>
              <Routes>
                <Route index element={<ManageVehicles />} />
                <Route path="manage-vehicles" element={<ManageVehicles />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="reports" element={<Reports />} />
                <Route path="locations" element={<Locations />} />
                <Route path="support-tickets" element={<CustomerSupportTickets />} />
                <Route path="fleet-management" element={<FleetManagement />} />
              </Routes>
            </AdminDashboardLayout>
          } />
          <Route path="/payment-success" element={<SuccessPage />} />
          <Route path="/payment-canceled" element={<Cancel />} />
        </Routes>
        <Footer />
        <ToastContainer /> {/* Add ToastContainer here */}
      </Router>
    </Elements>
  );
};

export default App;
