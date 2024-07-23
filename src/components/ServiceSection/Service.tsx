import './Service.scss';
import rentalIcon from '../../assets/images/car-loan.png'; // Replace with actual icon path
import maintenanceIcon from '../../assets/images/car-repair.png'; // Replace with actual icon path
import insuranceIcon from '../../assets/images/insurance.png'; // Replace with actual icon path
import supportIcon from '../../assets/images/emergency-services.png'; // Replace with actual icon path
import gpsIcon from '../../assets/images/gps.png'; // Replace with actual icon path
import fuelIcon from '../../assets/images/petrol-pump.png'; 
import deliveryIcon from '../../assets/images/shipped.png'; // Replace with actual icon path
import luxuryIcon from '../../assets/images/car-service.png'; // Replace with actual icon path
import ecoIcon from '../../assets/images/car image.webp'; // Replace with actual icon path
import airportIcon from '../../assets/images/airplane.png'; // Replace with actual icon path
import chauffeurIcon from '../../assets/images/car image.webp'; // Replace with actual icon path
import roadsideIcon from '../../assets/images/location (1).png'; // Replace with actual icon path



const OurServices = () => {
  return (
    <section className="our-services">
      <h2>Our Services</h2>
      <div className="services">
        <div className="service">
          <img src={rentalIcon} alt="Car Rental" />
          <h3>Car Rental</h3>
          <p>We offer a wide range of vehicles for rent, ensuring you find the perfect car for your needs.</p>
        </div>
        <div className="service">
          <img src={maintenanceIcon} alt="Maintenance" />
          <h3>Maintenance</h3>
          <p>Our vehicles are regularly maintained to ensure safety and reliability on the road.</p>
        </div>
        <div className="service">
          <img src={insuranceIcon} alt="Insurance" />
          <h3>Insurance</h3>
          <p>We provide comprehensive insurance options for peace of mind during your rental period.</p>
        </div>
        <div className="service">
          <img src={supportIcon} alt="24/7 Support" />
          <h3>24/7 Support</h3>
          <p>Our support team is available around the clock to assist you with any issues or questions.</p>
        </div>
        <div className="service">
          <img src={gpsIcon} alt="GPS Navigation" />
          <h3>GPS Navigation</h3>
          <p>All our cars come equipped with state-of-the-art GPS systems to help you navigate easily.</p>
        </div>
        <div className="service">
          <img src={fuelIcon} alt="Fuel Plans" />
          <h3>Fuel Plans</h3>
          <p>Choose from our various fuel plans to suit your travel needs and convenience.</p>
        </div>
        <div className="service">
          <img src={deliveryIcon} alt="Home Delivery" />
          <h3>Home Delivery</h3>
          <p>Get your rental car delivered to your doorstep with our convenient home delivery service.</p>
        </div>
        <div className="service">
          <img src={luxuryIcon} alt="Luxury Cars" />
          <h3>Luxury Cars</h3>
          <p>Experience the comfort and style of our luxury car rentals for special occasions.</p>
        </div>
        <div className="service">
          <img src={ecoIcon} alt="Eco-Friendly Options" />
          <h3>Eco-Friendly Options</h3>
          <p>Choose from our range of eco-friendly cars to reduce your carbon footprint.</p>
        </div>
        <div className="service">
          <img src={airportIcon} alt="Airport Pickup" />
          <h3>Airport Pickup</h3>
          <p>Enjoy the convenience of our airport pickup service, available at major airports.</p>
        </div>
        <div className="service">
          <img src={chauffeurIcon} alt="Chauffeur Service" />
          <h3>Chauffeur Service</h3>
          <p>Relax and enjoy the ride with our professional chauffeur service.</p>
        </div>
        <div className="service">
          <img src={roadsideIcon} alt="Roadside Assistance" />
          <h3>Roadside Assistance</h3>
          <p>Get peace of mind with our comprehensive roadside assistance available 24/7.</p>
        </div>
      </div>
    </section>
  );
};

export default OurServices;