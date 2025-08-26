import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  setCategories,
  setIngredients,
  resetFilters,
} from "../../redux/filters/slice";
import {
  selectFiltersCategories,
  selectFiltersIngredients,
} from "../../redux/filters/selectors";
import css from "../filterComponent/filterComponent.module.css";
import Icon from "../Icon/index";

export const FilterSelect = () => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector(selectFiltersCategories);
  const selectedIngredients = useSelector(selectFiltersIngredients);

  const [categoryOptions, setCategoriesOptions] = useState([]);
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 1024);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  useEffect(() => {
    // "http://localhost:5000/categories"
    fetch("/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategoriesOptions(
          data.data.map((c) => ({ label: c.name, value: c.id }))
        );
      });
    // "http://localhost:5000/ingredients"
    fetch("/ingredients")
      .then((res) => res.json())
      .then((data) => {
        setIngredientOptions(
          data.data.map((i) => ({ label: i.name, value: i.id }))
        );
      });
  }, []);

  const handleReset = () => {
    console.log("Reset filters");
    dispatch(resetFilters());
  };
  return (
    <div className={css.wrapper}>
      <div className={css.leftSide}>
        <h1>Recepice 99</h1>
      </div>

      {!isMobile && (
        <div className={css.rightSide}>
          <button className={css.resetBtn} type="button" onClick={handleReset}>
            Reset filter
          </button>

          <Select
            isMulti
            options={categoryOptions}
            value={selectedCategories}
            onChange={(val) => dispatch(setCategories(val))}
            placeholder="Select categories..."
          />
          <Select
            isMulti
            options={ingredientOptions}
            value={selectedIngredients}
            onChange={(val) => dispatch(setIngredients(val))}
            placeholder="Select ingredients..."
          />
        </div>
      )}

      {isMobile && (
        <>
          <button
            className={css.filterMobileBtn}
            onClick={() => setIsOpen(true)}
          >
            <Icon name="filterMobile" width={24} height={24} /> Filtrs
          </button>

          {isOpen && (
            <div
              className={css.filterModalOverlay}
              onClick={() => setIsOpen(false)}
            >
              <div
                className={css.filterModal}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Filtrs</h2>
                <Select
                  isMulti
                  options={categoryOptions}
                  value={selectedCategories}
                  onChange={(val) => dispatch(setCategories(val))}
                  placeholder="Select categories..."
                />
                <Select
                  isMulti
                  options={ingredientOptions}
                  value={selectedIngredients}
                  onChange={(val) => dispatch(setIngredients(val))}
                  placeholder="Select ingredients..."
                />

                <div className={css.filterActions}>
                  <button className={css.resetBtn} onClick={handleReset}>
                    Reset
                  </button>
                  <button
                    className={css.applyBtn}
                    onClick={() => setIsOpen(false)}
                  >
                    Застосувати
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
