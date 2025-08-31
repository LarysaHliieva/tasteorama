import css from "./SearchBox.module.css";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeSearch } from "../../redux/filters/slice";
import { selectSearchQuery } from "../../redux/filters/selectors";

export default function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const search = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search) return;
    setInputValue("");
    setError("")
  }, [search]);
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
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
      await validationSchema.validate(inputValue);
      setError("");

      dispatch(changeSearch(inputValue));
      console.log("Find recipe here:", search);
      setInputValue("");
    } catch (validationError) {
      setError(validationError.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div>
        <input
          type="text"
          value={inputValue}
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
