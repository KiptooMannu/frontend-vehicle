import  { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showAuthLinks, setShowAuthLinks] = useState(false); // State to toggle showing login/signup links

  const toggleAuthLinks = () => {
    setShowAuthLinks(!showAuthLinks);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">CARHUB</div>

        <div className="betweenL">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        </div>
        

        <div className="END">
        <div className="placeholder" onClick={toggleAuthLinks}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus">
            <path d="M2 21a8 8 0 0 1 13.292-6"/>
            <circle cx="10" cy="8" r="5"/>
            <path d="M19 16v6"/>
            <path d="M22 19h-6"/>
          </svg>
        </div>
        {showAuthLinks && (
          <ul className="auth-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        )}
        </div>
      
      </div>
    </nav>
  );
};

export default Navbar;
