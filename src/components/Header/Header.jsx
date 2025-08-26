import { NavLink, useLocation } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  const location = useLocation();
  
  if (location.pathname === '/auth/login' || location.pathname === '/auth/register') {
    return null;
  }

  return (
    <header className={css.header}>
      <div className={css.container}>
        <NavLink to="/" className={css.logo}>
          Tasteorama
        </NavLink>

        <nav className={css.nav}>
          <NavLink to="/" className={css.link}>Recipes</NavLink>
          <NavLink to="/auth/login" className={css.link}>Log in</NavLink>
          <NavLink to="/auth/register" className={css.registerBtn}>Register</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;