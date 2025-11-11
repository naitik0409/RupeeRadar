import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from './SearchBar';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <Logo size="default" />
        </Link>
        
        <div className="navbar-search">
          <SearchBar />
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
        </button>

        <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/market" 
            className={`nav-link ${location.pathname === '/market' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Market
          </Link>
          <Link 
            to="/watchlist" 
            className={`nav-link ${location.pathname === '/watchlist' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Watchlist
          </Link>
          <Link 
            to="/news" 
            className={`nav-link ${location.pathname === '/news' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            News
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
