import { NavLink } from "react-router-dom";
import Icon from "../Icon/index.jsx";
import css from "./BurgerMenu.module.css";

const BurgerMenuAuth = ({
  isOpen,
  onClose,
  name,
  firstLetter,
  handleLogout,
}) => {
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

          <NavLink to="/profile" className={css.link} onClick={onClose}>
            My profile
          </NavLink>

          <div className={css.userInfoWrap}>
            <div className={css.userInfo}>
              <span className={css.avatar}>{firstLetter}</span>
              <span className={css.userName}>{name}</span>
            </div>
            <button type="button" className={css.logout} onClick={handleLogout}>
              <Icon name="log-out" width={32} height={32} color="#ffffff" />
            </button>
          </div>

          <NavLink
            to="/add-recipe"
            className={css.registerLink}
            onClick={onClose}
          >
            Add recipe
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default BurgerMenuAuth;
