import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import css from "./Profile.module.css";
import clsx from "clsx";

export default function Profile() {
  return (
    <div className={clsx(css.profile, "container")}>
      <div className={css.header}>
        <h2 className={css.title}>My profile</h2>
        <nav className={css.nav}>
          <NavLink to="own" className={css.navItem}>
            My Recipes
          </NavLink>
          <NavLink to="favorites" className={css.navItem}>
            Saved Recipes
          </NavLink>
        </nav>
        <div className={css.counter}>96 recipes</div>
      </div>
      <Outlet />
    </div>
  );
}
