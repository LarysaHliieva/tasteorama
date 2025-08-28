import { NavLink } from "react-router-dom";
import Icon from "../Icon/index.jsx";
import css from "./BurgerMenu.module.css";

const BurgerMenu = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`${css.overlay} ${isOpen ? css.overlayOpen : ""}`}
        onClick={onClose}
      ></div>

      <div className={`${css.menu} ${isOpen ? css.menuOpen : ""}`}>
        <NavLink to="/" className={css.logo}>
          <Icon name="logo" width={32} height={32} />
          Tasteorama
        </NavLink>
        <button className={css.closeButton} onClick={onClose}>
          <Icon name="close" width={32} height={32} color="#ffffff" />
        </button>

        <nav className={css.nav}>
          <NavLink to="/" className={css.link} onClick={onClose}>
            Recipes
          </NavLink>

          <NavLink to="/auth/login" className={css.link} onClick={onClose}>
            Log in
          </NavLink>

          <NavLink
            to="/auth/register"
            className={css.registerLink}
            onClick={onClose}
          >
            Register
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default BurgerMenu;
