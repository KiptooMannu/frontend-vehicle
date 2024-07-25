import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [showAuthLinks, setShowAuthLinks] = useState<boolean>(false); // State to toggle showing login/signup links
  const [showNavLinks, setShowNavLinks] = useState<boolean>(false); // State to toggle showing navigation links

  const toggleAuthLinks = () => {
    setShowAuthLinks(prevState => !prevState);
    if (showNavLinks) {
      setShowNavLinks(false); // Close nav links if open
    }
  };

  const toggleNavLinks = () => {
    setShowNavLinks(prevState => !prevState);
    if (showAuthLinks) {
      setShowAuthLinks(false); // Close auth links if open
    }
  };

  const handleNavLinkClick = () => {
    setShowNavLinks(false); // Hide navigation links when any link is clicked
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">CARHUB</div>

        {/* Hamburger Menu */}
        <div className="hamburger-menu" onClick={toggleNavLinks}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${showNavLinks ? 'show' : 'hide'}`}>
          <li><Link to="/" onClick={handleNavLinkClick}>Home</Link></li>
          <li><Link to="/about" onClick={handleNavLinkClick}>About</Link></li>
          <li><Link to="/services" onClick={handleNavLinkClick}>Services</Link></li>
          <li><Link to="/contact" onClick={handleNavLinkClick}>Contact</Link></li>
        </ul>

        {/* Auth Links */}
        <div className="placeholder" onClick={toggleAuthLinks}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus">
            <path d="M2 21a8 8 0 0 1 13.292-6"/>
            <circle cx="10" cy="8" r="5"/>
            <path d="M19 16v6"/>
            <path d="M22 19h-6"/>
          </svg>
        </div>
        <ul className="auth-links" style={{ display: showAuthLinks ? 'flex' : 'none' }}>
          <div className="login">
            <li><Link to="/login" onClick={toggleAuthLinks}>Login</Link></li>
          </div>
          <div className="signup">
            <li><Link to="/signup" onClick={toggleAuthLinks}>Signup</Link></li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
