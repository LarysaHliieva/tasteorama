import { NavLink } from 'react-router-dom';
import css from './BurgerMenu.module.css';

const BurgerMenuAuth = ({ isOpen, onClose, user }) => {
  // Функція для отримання першої літери імені
  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <>
      <div className={`${css.overlay} ${isOpen ? css.overlayOpen : ''}`} onClick={onClose}></div>
      
      <div className={`${css.menu} ${isOpen ? css.menuOpen : ''}`}>
        <button className={css.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <nav className={css.nav}>
          {/* Інформація про користувача */}
          <div className={css.userInfoMobile}>
            <span className={css.avatarMobile}>
              {getFirstLetter(user?.name)}
            </span>
            <span className={css.userNameMobile}>{user?.name}</span>
          </div>

          <NavLink to="/" className={css.link} onClick={onClose}>
            Recipes
          </NavLink>
          
          <NavLink to="/add-recipe" className={css.link} onClick={onClose}>
            Add recipe
          </NavLink>
          
          <NavLink to="/profile" className={css.link} onClick={onClose}>
            My profile
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default BurgerMenuAuth;