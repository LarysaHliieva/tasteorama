// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { NavLink, useLocation } from "react-router-dom";
// import logoIcon from '../../assets/Group 6884.svg'; // Імпорт як зображення
// import css from "./Header.module.css";
// import BurgerMenu from "./BurgerMenu";
// import BurgerMenuAuth from "./BurgerMenuAuth";

// // ТИМЧАСОВА ЗАГЛУШКА
// const selectIsLoggedIn = () => true;
// const selectUser = () => ({ name: "John" });

// const Header = () => {
//   const location = useLocation();
//   const [isBurgerOpen, setIsBurgerOpen] = useState(false);
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const user = useSelector(selectUser);

//   if (location.pathname === "/auth/login" || location.pathname === "/auth/register") {
//     return null;
//   }

//   const toggleBurgerMenu = () => setIsBurgerOpen(!isBurgerOpen);
//   const closeBurgerMenu = () => setIsBurgerOpen(false);

//   const getFirstLetter = (name) => {
//     return name ? name.charAt(0).toUpperCase() : "?";
//   };

//   return (
//     <header className={css.header}>
//       <div className={css.container}>
//         <NavLink to="/" className={css.logo}>
//           <img src={logoIcon} alt="Tasteorama Logo" className={css.logoIcon} /> {/* Використання як img */}
//           Tasteorama
//         </NavLink>

//         {isLoggedIn ? (
//           <nav className={css.nav}>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 isActive ? `${css.link} ${css.active}` : css.link
//               }
//             >
//               Recipes
//             </NavLink>

//             <NavLink
//               to="/add-recipe"
//               className={({ isActive }) =>
//                 isActive ? `${css.link} ${css.active}` : css.link
//               }
//             >
//               Add recipe
//             </NavLink>

//             <NavLink
//               to="/profile"
//               className={({ isActive }) =>
//                 isActive ? `${css.link} ${css.active}` : css.link
//               }
//             >
//               My profile
//             </NavLink>

//             <div className={css.userInfo}>
//               <span className={css.avatar}>{getFirstLetter(user?.name)}</span>
//               <span className={css.userName}>{user?.name}</span>
//             </div>
//           </nav>
//         ) : (
//           <nav className={css.nav}>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 isActive ? `${css.link} ${css.active}` : css.link
//               }
//             >
//               Recipes
//             </NavLink>

//             <NavLink
//               to="/auth/login"
//               className={({ isActive }) =>
//                 isActive ? `${css.link} ${css.active}` : css.link
//               }
//             >
//               Log in
//             </NavLink>

//             <NavLink
//               to="/auth/register"
//               className={({ isActive }) =>
//                 isActive ? `${css.registerBtn} ${css.active}` : css.registerBtn
//               }
//             >
//               Register
//             </NavLink>
//           </nav>
//         )}

//         <button className={css.burgerButton} onClick={toggleBurgerMenu}>
//           <span className={css.burgerLine}></span>
//           <span className={css.burgerLine}></span>
//           <span className={css.burgerLine}></span>
//         </button>
//       </div>

//       {/* Бургер-меню */}
//       {isLoggedIn ? (
//         <BurgerMenuAuth isOpen={isBurgerOpen} onClose={closeBurgerMenu} user={user} />
//       ) : (
//         <BurgerMenu isOpen={isBurgerOpen} onClose={closeBurgerMenu} />
//       )}
//     </header>
//   );
// };

// export default Header;

import { useState } from "react";
import { useSelector } from "react-redux"; // Імпорт залишається для програміста
import { NavLink, useLocation } from "react-router-dom";
import logoIcon from '../../assets/Group 6884.svg';
import css from "./Header.module.css";
import BurgerMenu from "./BurgerMenu";
import BurgerMenuAuth from "./BurgerMenuAuth";

const Header = () => {
  const location = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  // !!! МІСЦЕ ДЛЯ ПІДКЛЮЧЕННЯ REDUX (Потрібно розкоментувати програмісту) !!!
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // const user = useSelector(state => state.auth.user);
  
  // Стан за замовчуванням - неавторизований користувач
  const isLoggedIn = false;
  const user = null;

  if (location.pathname === "/auth/login" || location.pathname === "/auth/register") {
    return null;
  }

  const toggleBurgerMenu = () => setIsBurgerOpen(!isBurgerOpen);
  const closeBurgerMenu = () => setIsBurgerOpen(false);

  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <NavLink to="/" className={css.logo}>
          <img src={logoIcon} alt="Tasteorama Logo" className={css.logoIcon} />
          Tasteorama
        </NavLink>

        {isLoggedIn ? (
          <nav className={css.nav}>
            <NavLink to="/" className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
              Recipes
            </NavLink>
            <NavLink to="/add-recipe" className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
              Add recipe
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
              My profile
            </NavLink>
            <div className={css.userInfo}>
              <span className={css.avatar}>{getFirstLetter(user?.name)}</span>
              <span className={css.userName}>{user?.name}</span>
            </div>
          </nav>
        ) : (
          <nav className={css.nav}>
            <NavLink to="/" className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
              Recipes
            </NavLink>
            <NavLink to="/auth/login" className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
              Log in
            </NavLink>
            <NavLink to="/auth/register" className={({ isActive }) => isActive ? `${css.registerBtn} ${css.active}` : css.registerBtn}>
              Register
            </NavLink>
          </nav>
        )}

        <button className={css.burgerButton} onClick={toggleBurgerMenu}>
          <span className={css.burgerLine}></span>
          <span className={css.burgerLine}></span>
          <span className={css.burgerLine}></span>
        </button>
      </div>

      {isLoggedIn ? (
        <BurgerMenuAuth isOpen={isBurgerOpen} onClose={closeBurgerMenu} user={user} />
      ) : (
        <BurgerMenu isOpen={isBurgerOpen} onClose={closeBurgerMenu} />
      )}
    </header>
  );
};

export default Header;