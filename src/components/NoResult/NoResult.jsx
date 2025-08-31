import { useDispatch } from "react-redux";
import { resetFilters } from "../../redux/filters/slice";
import css from "../NoResult/noResult.module.css";

export const NoResult = ({ isButton = true }) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={css.wrapper}>
      <p className={css.text}>We’re sorry! We were not able to find a match.</p>
      {isButton && (
        <button type="button" onClick={handleReset} className={css.button}>
          Reset serach and filters
        </button>
      )}
    </div>
  );
};
