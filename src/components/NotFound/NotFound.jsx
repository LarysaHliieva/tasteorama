import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <picture>
        <source srcSet="/images/notfound.jpg" media="(min-width: 768px)" />
        <img
          src="/images/notfound-mobile.jpg"
          alt="Recipe not found"
          className={styles.image}
        />
      </picture>
      <h2 className={styles.title}>404</h2>
      <p className={styles.text}>Recipe not found</p>
      <Link to="/" className={styles.button}>
        ← Back to Home
      </Link>
    </div>
  );
}
