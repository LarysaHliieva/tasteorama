// import { Outlet } from "react-router-dom";

// import css from "./Loyout.module.css";

// export default function Loyout() {
//   return (
//     <div className={css.loyout}>
//       Header
//       <div className={css.loyoutOutlet}>
//         <Outlet />
//       </div>
//       Footer
//     </div>
//   );
// }

// src/components/Loyout/Loyout.jsx
import { Outlet } from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer'; // Додаємо імпорт
import css from "./Loyout.module.css";

export default function Loyout() {
  return (
    <div className={css.loyout}>
      <Header />
      <div className={css.loyoutOutlet}>
        <Outlet />
      </div>
      <Footer /> {/* Додаємо футер */}
    </div>
  );
}