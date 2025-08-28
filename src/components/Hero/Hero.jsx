import css from "./Hero.module.css";
import SearchBox from "../SearchBox/SearchBox";
export default function Hero() {
  return (
    <div className={css.hero}>
      <div className={css.heroWrapper}>
        <h1 className={css.title}>Plan, Cook, and Share Your Flavors</h1>
        <SearchBox />
      </div>
    </div>
  );
}
