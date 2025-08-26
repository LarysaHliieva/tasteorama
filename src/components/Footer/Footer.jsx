import { useLocation, NavLink } from 'react-router-dom';
import css from './Footer.module.css';

const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/auth/login' || location.pathname === '/auth/register') {
    return null;
  }

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <NavLink to="/" className={css.logo}>
          Tasteorama
        </NavLink>

        <p className={css.copyright}>© 2025 CookingCompanion. All rights reserved</p>

        <nav className={css.nav}>
          <NavLink to="/" className={css.link}>Recipes</NavLink>
          <NavLink to="/profile" className={css.link}>Account</NavLink>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;