import React from 'react';
import './Footer.scss';
import linkedinIcon from'../../assets/images/dashboard.png'; // Replace with the actual icon path

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>fleeton</h2>
          <p>FleetON serves as a cloud-based system specifically designed to manage car rentals efficiently.</p>
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </div>
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📧 info@fleetonapp.com</p>
          <p>📞 +389 70 910 522</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">HOME</a></li>
            <li><a href="/products">PRODUCTS</a></li>
            <li><a href="/about">WHO WE ARE</a></li>
            <li><a href="/blog">BLOG</a></li>
            <li><a href="/contact">CONTACT US</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Subscribe to Our Newsletter</h3>
          <form>
            <input type="email" placeholder="Your email" />
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 FleetON, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
