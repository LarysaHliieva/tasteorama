import { NavLink } from 'react-router-dom';
import css from './BurgerMenu.module.css';

const BurgerMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Затемнений фон */}
      <div className={`${css.overlay} ${isOpen ? css.overlayOpen : ''}`} onClick={onClose}></div>
      
      {/* Саме меню */}
      <div className={`${css.menu} ${isOpen ? css.menuOpen : ''}`}>
        <button className={css.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <nav className={css.nav}>
          <NavLink to="/" className={css.link} onClick={onClose}>
            Recipes
          </NavLink>
          
          <NavLink to="/auth/login" className={css.link} onClick={onClose}>
            Log in
          </NavLink>
          
          <NavLink to="/auth/register" className={css.registerLink} onClick={onClose}>
            Register
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default BurgerMenu;