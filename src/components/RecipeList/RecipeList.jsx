// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/recipes/operations";
import RecipeCard from "../RecipeCard/RecipeCard";
import {
  selectRecipes,
  selectRecipesPage,
  selectRecipesTotalPages,
} from "../../redux/recipes/selectors";
import {
  selectFiltersCategories,
  selectFiltersIngredients,
  selectSearchQuery,
} from "../../redux/filters/selectors";
import css from "../RecipeList/recipeList.module.css";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export function RecipeList() {
  const dispatch = useDispatch();
  const all = useSelector(selectRecipes);
  const page = useSelector(selectRecipesPage);
  const totalPages = useSelector(selectRecipesTotalPages);

  const categories = useSelector(selectFiltersCategories);
  const ingredients = useSelector(selectFiltersIngredients);
  const searchQuery = useSelector(selectSearchQuery);

  const filters = { categories, ingredients, searchQuery };

  // useEffect(() => {

  //   dispatch(getRecipes({ page: 1, limit: 12, filters }));
  // }, [categories, ingredients, searchQuery, dispatch]);

  const loadMore = () => {
    dispatch(getRecipes({ page: page + 1, limit: 12, filters }));
  };

  return (
    <div>
      <div className={css.recipeList}>
        {all.map((recipe, index) => (
          <RecipeCard
            key={recipe.id || index}
            title={recipe.title}
            description={recipe.description}
            thumb={recipe.thumb}
            time={recipe.time}
            calories={recipe.calories}
          />
        ))}
      </div>

      {page < totalPages && <LoadMoreBtn onClick={loadMore} />}
    </div>
  );
}
