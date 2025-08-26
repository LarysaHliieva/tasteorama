import { useLocation, NavLink } from 'react-router-dom';
import css from './Footer.module.css';

// ТИМЧАСОВА ЗАГЛУШКА
const selectIsLoggedIn = () => false;

const Footer = () => {
  const isLoggedIn = selectIsLoggedIn();
  const location = useLocation();

  // Визначаємо, чи знаходимось на сторінках авторизації
  const isAuthPage = location.pathname === '/auth/login' || location.pathname === '/auth/register';

  const handleProfileClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      // Тут буде відкриття модального вікна
      console.log('Open auth modal');
    }
  };

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        
        {/* Лого */}
        <NavLink to="/" className={css.logo}>
          Tasteorama
        </NavLink>

        {/* Копірайт */}
        <p className={css.copyright}>© 2025 CookingCompanion. All rights reserved</p>

        {/* Навігація */}
        <nav className={css.nav}>
          <NavLink to="/" className={css.link}>
            Recipes
          </NavLink>
          
          {/* Показуємо "Account" тільки якщо НЕ на сторінці авторизації */}
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