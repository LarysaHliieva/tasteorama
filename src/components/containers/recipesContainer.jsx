import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/recipes/operations";
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
import { RecipeList } from "../RecipeList/RecipeList";
import { NoResult } from "../NoResult/NoResult";

export function RecipeContainer() {
  const dispatch = useDispatch();
  const all = useSelector(selectRecipes);
  const page = useSelector(selectRecipesPage);
  const totalPages = useSelector(selectRecipesTotalPages);

  const categories = useSelector(selectFiltersCategories);
  const ingredients = useSelector(selectFiltersIngredients);
  const searchQuery = useSelector(selectSearchQuery);

  const filters = { categories, ingredients, searchQuery };

  useEffect(() => {
    dispatch(getRecipes({ page: 1, limit: 12, filters }));
  }, [categories, ingredients, searchQuery, dispatch]);

  const loadMore = () => {
    dispatch(getRecipes({ page: page + 1, limit: 12, filters }));
  };
  if (all.length === 0 && searchQuery) {
    return <NoResult />;
  }

  return (
    <RecipeList
      recipes={all}
      page={page}
      totalPages={totalPages}
      onLoadMore={loadMore}
    />
  );
}
