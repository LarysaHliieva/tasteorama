import React from "react";
import { Outlet } from "react-router-dom";

import css from "./Auth.module.css";

export default function AuthPage() {
  return (
    <div className={css.auth}>
      <Outlet />
    </div>
  );
}
