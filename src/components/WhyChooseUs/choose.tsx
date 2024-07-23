import './choose.scss';
import supportIcon from '../../assets/images/car-repair.png'; // Replace with actual icon path
import mobileIcon from '../../assets/images/telephone.png'; // Replace with actual icon path
import businessIcon from '../../assets/images/sale.png'; // Replace with actual icon path
import salesIcon from '../../assets/images/sale.png'; // Replace with actual icon path

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <h2>Why Choose Our Platform</h2>
      <div className="features">
        <div className="feature">
          <img src={supportIcon} alt="Customer Support" />
          <h3>Customer Support</h3>
          <p>Our support team is at your service 24/7, ready to assist you whenever you need it.</p>
        </div>

        <div className="feature">
          <img src={supportIcon} alt="Customer Support" />
          <h3>Customer Support</h3>
          <p>Our support team is at your service 24/7, ready to assist you whenever you need it.</p>
        </div>


        <div className="feature">
          <img src={supportIcon} alt="Customer Support" />
          <h3>Customer Support</h3>
          <p>Our support team is at your service 24/7, ready to assist you whenever you need it.</p>
        </div>

        <div className="feature">
          <img src={supportIcon} alt="Customer Support" />
          <h3>Customer Support</h3>
          <p>Our support team is at your service 24/7, ready to assist you whenever you need it.</p>
        </div>

        <div className="feature">
          <img src={supportIcon} alt="Customer Support" />
          <h3>Customer Support</h3>
          <p>Our support team is at your service 24/7, ready to assist you whenever you need it.</p>
        </div>

        
        <div className="feature">
          <img src={mobileIcon} alt="Premium Mobile Solution" />
          <h3>Premium Mobile Solution</h3>
          <p>Make a reservation, inspect your car, and manage your bookings on the go with our mobile app.</p>
        </div>
        <div className="feature">
          <img src={businessIcon} alt="Focus on your business" />
          <h3>Focus on Your Business</h3>
          <p>Direct your full attention to your business operations while we efficiently handle all your rental needs.</p>
        </div>
        <div className="feature">
          <img src={salesIcon} alt="Boost Your Sales" />
          <h3>Boost Your Sales</h3>
          <p>Increase your sales and reduce broker fees with our fully managed booking engine.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
