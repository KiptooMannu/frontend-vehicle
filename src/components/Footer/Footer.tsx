import React from 'react';
import './Footer.scss';


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>CarHub</h2>
          <p>CarHub serves as a cloud-based system specifically designed to manage car rentals efficiently.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📧 info@CarHubapp.com</p>
          <p> 📞 0113897004</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">HOME</a></li>
            <li><a href="/contact">CONTACT US</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Subscribe to Our Newsletter</h3>
          <form>
            <input type="email" placeholder="Email" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
