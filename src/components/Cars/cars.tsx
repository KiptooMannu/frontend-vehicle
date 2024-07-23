import './cars.scss';

// Import your car images locally
import car1 from '../../assets/images/images/offer-toyota.png';
import car2 from '../../assets/images/images/mercedes-offer.png';
import car3 from '../../assets/images/images/tesla.jpg';
import car4 from '../../assets/images/car image.webp';
import car5 from '../../assets/images/The BMW M850i at SIXT.jpeg';
import car6 from '../../assets/images/images/The BMW M850i at SIXT.jpeg';
import car7 from '../../assets/images/images/Car Rentals _ Mack Car Rentals _ Eleuthera, Bahamas.jpeg';
import car8 from '../../assets/images/Car Rentals _ Mack Car Rentals _ Eleuthera, Bahamas.jpeg';

const cars = [
  { imageSrc: car1, name: 'Toyota Corolla', specs: 'Compact Sedan' },
  { imageSrc: car2, name: 'BMW M850i', specs: 'Luxury Coupe' },
  { imageSrc: car3, name: 'Chevrolet Camaro', specs: 'Sports Car' },
  { imageSrc: car4, name: 'Audi Q7', specs: 'SUV' },
  { imageSrc: car5, name: 'Honda Accord', specs: 'Midsize Sedan' },
  { imageSrc: car6, name: 'Tesla Model S', specs: 'Electric Sedan' },
  { imageSrc: car7, name: 'Porsche 911', specs: 'Sports Car' },
  { imageSrc: car8, name: 'Mercedes-Benz S-Class', specs: 'Luxury Sedan' },
  { imageSrc: car4, name: 'Audi Q7', specs: 'SUV' },
  { imageSrc: car5, name: 'Honda Accord', specs: 'Midsize Sedan' },
  { imageSrc: car6, name: 'Tesla Model S', specs: 'Electric Sedan' },
  { imageSrc: car7, name: 'Porsche 911', specs: 'Sports Car' },

];

const Car: React.FC = () => {
  return (
    <section className="car">
      <h2 className="car-title">Our Fleet</h2>
      <div className="car-grid">
        {cars.map((car, index) => (
          <div key={index} className="car-card">
            <img src={car.imageSrc} alt={car.name} className="car-image" />
            <div className="car-details">
              <h3 className="car-name">{car.name}</h3>
              <p className="car-specs">{car.specs}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Car;
