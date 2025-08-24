import css from "./SearchBox.module.css";
import * as Yup from "yup";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeSearch } from "../../redux/search/slice";
import { selectSearchQuery } from "../../redux/search/selectors";

export default function SearchBox() {  
  const [error, setError] = useState("");

  const search = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeSearch(e.target.value));

    setError("");
  };

  const validationSchema = Yup.string()
    .min(2, "Minimum 2 characters")
    .max(64, "Maximum 64 characters")
    .matches(/^[a-zA-Zа-яА-Я\s-]+$/, "Only letters allowed")
    .required("Enter the recipe name");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(search);
      setError("");

      console.log("Find recipe here:", search);


    } catch (validationError) {
      setError(validationError.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search recipes"
          className={`${css.input} ${error ? css.inputError : ""}`}
        />
        <div className={css.errorPlaceholder}>
          {error && <p className={css.error}>{error}</p>}
        </div>
      </div>
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}
