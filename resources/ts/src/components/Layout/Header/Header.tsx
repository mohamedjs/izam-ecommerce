import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { logoutAsync } from '@/store/auth/auth.slice';
import Button from '@/components/shared/Button/Button';
import './Header.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="promo-banner">
        <span>Sign up and get 20% off to your first order.</span>
        <button className="promo-signup">Sign Up Now</button>
        <button className="promo-close">×</button>
      </div>
      
      <header className="header">
        <div className="header__container">
          <button className="header__mobile-menu" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="header__logo">
            <div className="logo">i:zam</div>
          </Link>

          <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
            <Link to="/products" className="header__nav-link">Products</Link>
            <Link to="/sell" className="header__nav-link header__nav-link--highlight">
              Sell Your Product
            </Link>
          </nav>

          <div className="header__actions">
            <Link to="/cart" className="header__cart">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="header__cart-count">{cartItemsCount}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <Button variant="primary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;