import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import css from "./Loyout.module.css";

export default function Loyout() {
  return (
    <div className={css.loyout}>
      <Header />
      <div className={css.loyoutOutlet}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
