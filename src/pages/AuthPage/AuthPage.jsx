import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AuthPage() {
  return <div>
    <nav>
      <Link to="register"></Link>
      <Link to="/auth/login"></Link>
    </nav>
    <Outlet/>
  </div>;
}
