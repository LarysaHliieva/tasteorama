import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import BurgerMenu from "./BurgerMenu";
import BurgerMenuAuth from "./BurgerMenuAuth"; // Створимо окремий компонент для авторизованого стану

// ТИМЧАСОВА ЗАГЛУШКА
const selectIsLoggedIn = () => true; // Змінюємо на true для тестування авторизованого стану
const selectUser = () => ({ name: "John" }); // Заглушка для користувача

const Header = () => {
  const location = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  if (
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register"
  ) {
    return null;
  }

  const toggleBurgerMenu = () => setIsBurgerOpen(!isBurgerOpen);
  const closeBurgerMenu = () => setIsBurgerOpen(false);

  // Функція для отримання першої літери імені
  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <header className={css.header}>
      <NavLink to="/" className={css.logo}>
        Tasteorama
      </NavLink>

      {/* Звичайна навігація для десктопів */}
      {isLoggedIn ? (
        /* Навігація для авторизованого користувача */
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
            to="/add-recipe"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Add recipe
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            My profile
          </NavLink>

          {/* Аватар з першою літерою імені */}
          <div className={css.userInfo}>
            <span className={css.avatar}>{getFirstLetter(user?.name)}</span>
            <span className={css.userName}>{user?.name}</span>
          </div>
        </nav>
      ) : (
        /* Навігація для НЕ авторизованого користувача */
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
              isActive ? `${css.registerBtn} ${css.active}` : css.registerBtn
            }
          >
            Register
          </NavLink>
        </nav>
      )}

      {/* Кнопка бургер-меню для мобільних */}
      <button className={css.burgerButton} onClick={toggleBurgerMenu}>
        <span className={css.burgerLine}></span>
        <span className={css.burgerLine}></span>
        <span className={css.burgerLine}></span>
      </button>

      {/* Бургер-меню */}
      {isLoggedIn ? (
        <BurgerMenuAuth
          isOpen={isBurgerOpen}
          onClose={closeBurgerMenu}
          user={user}
        />
      ) : (
        <BurgerMenu isOpen={isBurgerOpen} onClose={closeBurgerMenu} />
      )}
    </header>
  );
};

export default Header;
