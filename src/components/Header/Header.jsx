import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import Icon from "../Icon/index.jsx";
import Modal from "../Modal/Modal.jsx";
import BurgerMenu from "./BurgerMenu";
import BurgerMenuAuth from "./BurgerMenuAuth";

import css from "./Header.module.css";
import Logout from "../AuthComponent/logout.jsx";
const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const user = useSelector(selectUser);

  const name = user.user?.name || "";

  const firstLetter = useMemo(() => {
    return name ? name.charAt(0).toUpperCase() : "?";
  }, [name]);

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isOpenModalLogout, setIsOpenModalLogout] = useState(false);

  const toggleBurgerMenu = () => setIsBurgerOpen(!isBurgerOpen);
  const closeBurgerMenu = () => setIsBurgerOpen(false);

  const handleOpenModalLogout = () => setIsOpenModalLogout(true);
  const handleCloseModalLogout = () => setIsOpenModalLogout(false);

  const logout = Logout();

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <NavLink to="/" className={css.logo}>
            <Icon name="logo" width={32} height={32} />
            Tasteorama
          </NavLink>

          {isLoggedIn ? (
            <nav className={css.nav}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${css.link} ${css.active}` : css.link
                }
              >
                Recipes
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? `${css.link} ${css.active}` : css.link
                }
              >
                My profile
              </NavLink>
              <NavLink
                to="/add-recipe"
                className={({ isActive }) =>
                  isActive
                    ? `${css.registerBtn} ${css.active}`
                    : css.registerBtn
                }
              >
                Add recipe
              </NavLink>

              <div className={css.userInfo}>
                <span className={css.avatar}>{firstLetter}</span>
                <span className={css.userName}>{name}</span>
              </div>
              <button
                type="button"
                className={css.logout}
                onClick={handleOpenModalLogout}
              >
                <Icon name="log-out" width={32} height={32} color="#ffffff" />
              </button>
            </nav>
          ) : (
            <nav className={css.nav}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${css.link} ${css.active}` : css.link
                }
              >
                Recipes
              </NavLink>
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  isActive ? `${css.link} ${css.active}` : css.link
                }
              >
                Log in
              </NavLink>
              <NavLink
                to="/auth/register"
                className={({ isActive }) =>
                  isActive
                    ? `${css.registerBtn} ${css.active}`
                    : css.registerBtn
                }
              >
                Register
              </NavLink>
            </nav>
          )}

          <button className={css.burgerButton} onClick={toggleBurgerMenu}>
            <Icon
              name="burger-regular"
              width={32}
              height={32}
              color="#ffffff"
            />
          </button>
        </div>

        {isLoggedIn ? (
          <BurgerMenuAuth
            isOpen={isBurgerOpen}
            onClose={closeBurgerMenu}
            name={name}
            firstLetter={firstLetter}
            handleLogout={handleOpenModalLogout}
          />
        ) : (
          <BurgerMenu isOpen={isBurgerOpen} onClose={closeBurgerMenu} />
        )}
      </header>

      <Modal
        isOpen={isOpenModalLogout}
        onClose={handleCloseModalLogout}
        title="Are you shure?"
        desc="We will miss you!"
        confirmText="Log out"
        onConfirm={() => logout()}
      />
    </>
  );
};

export default Header;
