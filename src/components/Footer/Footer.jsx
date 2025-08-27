import { useLocation, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import css from './Footer.module.css';

// ТИМЧАСОВА ЗАГЛУШКА
const selectIsLoggedIn = () => false;

const Footer = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  if (location.pathname === '/auth/login' || location.pathname === '/auth/register') {
    return null;
  }

  const handleProfileClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      console.log('Open auth modal');
    }
  };

  const isAuthPage = location.pathname === '/auth/login' || location.pathname === '/auth/register';

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        
        <NavLink to="/" className={css.logo}>
          Tasteorama
        </NavLink>

        <p className={css.copyright}>© 2025 CookingCompanion. All rights reserved</p>

        <nav className={css.nav}>
          <NavLink to="/" className={css.link}>
            Recipes
          </NavLink>
          
          {!isAuthPage && (
            <NavLink 
              to="/profile" 
              className={css.link}
              onClick={handleProfileClick}
            >
              Account
            </NavLink>
          )}
        </nav>

      </div>
    </footer>
  );
};

export default Footer;