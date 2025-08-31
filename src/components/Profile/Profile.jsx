import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import clsx from "clsx";

import css from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={clsx("container", css.profileSection)}>
      <div className={css.header}>
        <h2 className={css.title}>My profile</h2>
        <nav className={css.nav}>
          <NavLink
            to="own"
            className={({ isActive }) =>
              clsx(css.navItem, isActive && css.active)
            }
          >
            My Recipes
          </NavLink>
          <NavLink
            to="favorites"
            className={({ isActive }) =>
              clsx(css.navItem, isActive && css.active)
            }
          >
            Saved Recipes
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
