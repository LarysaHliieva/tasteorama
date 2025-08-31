import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  setCategories,
  setIngredients,
  resetFilters,
} from "../../redux/filters/slice";
import {
  selectCategoriesOptions,
  selectFiltersCategories,
  selectFiltersIngredients,
  selectIngredientsOptions,
  selectSearchQuery,
} from "../../redux/filters/selectors";
import css from "./filterComponent.module.css";
import Icon from "../Icon/index";
import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations";
import { selectRecipesTotalItems } from "../../redux/recipes/selectors";
import { getRecipes } from "../../redux/recipes/operations";


export const FilterSelect = () => {
  const dispatch = useDispatch();

  const selectedTotalItems = useSelector(selectRecipesTotalItems);
  const selectedCategories = useSelector(selectFiltersCategories);
  const selectedIngredients = useSelector(selectFiltersIngredients);
  const categoriesOptions = useSelector(selectCategoriesOptions);
  const ingredientsOptions = useSelector(selectIngredientsOptions);
  const recipesSearchQuery = useSelector(selectSearchQuery);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(
      getRecipes({
        page: 1,
        limit: 12,
        filters: { categories: [], ingredients: [], searchQuery: "" },
      })
    );
  };

  return (
    <>
      <h1 className={css.name}>{recipesSearchQuery ? `Search Results for "${recipesSearchQuery}"`: "Recepice" }</h1>
      <div className={css.wrapper}>
        <div className={css.leftSide}>
          <p>{selectedTotalItems} recepis</p>
        </div>

        <div className={css.rightSide}>
          <button className={css.resetBtn} type="button" onClick={handleReset}>
            Reset filters
          </button>

          <Select
            isMulti
            options={categoriesOptions}
            value={selectedCategories}
            onChange={(val) => dispatch(setCategories(val))}
            placeholder="Select categories..."
          />
          <Select
            isMulti
            options={ingredientsOptions}
            value={selectedIngredients}
            onChange={(val) => dispatch(setIngredients(val))}
            placeholder="Select ingredients..."
          />
        </div>
        <button className={css.filterMobileBtn} onClick={() => setIsOpen(true)}>
          Filters <Icon name="filterMobile" width={24} height={24} />
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
              <button onClick={() => setIsOpen(false)} className={css.filterClose}>
                Filters
                <Icon name="close" width={24} height={24} />
              </button>

              <div className={css.selectBody}>
                <Select
                isMulti
                options={categoriesOptions}
                value={selectedCategories}
                onChange={(val) => dispatch(setCategories(val))}
                placeholder="Select categories..."
              />
              <Select
                isMulti
                options={ingredientsOptions}
                value={selectedIngredients}
                onChange={(val) => dispatch(setIngredients(val))}
                placeholder="Select ingredients..."
              />
                <button className={`${css.resetBtn} ${css.resetBtnInModal}`} onClick={handleReset}>
                  Reset filters
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
};
