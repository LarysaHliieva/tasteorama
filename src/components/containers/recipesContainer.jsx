import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, getRecipes } from "../../redux/recipes/operations";
import {
  selectRecipes,
  selectRecipesFavorites,
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
  const favorite = useSelector(selectRecipesFavorites);

  const filters = useMemo(() => {
    return { categories, ingredients, searchQuery };
  }, [categories, ingredients, searchQuery]);

  useEffect(() => {
    dispatch(getRecipes({ page: 1, limit: 12, filters }));
    dispatch(getFavorites({ limit: 1000 }));
  }, [filters, dispatch]);

  const loadMore = () => {
    dispatch(getRecipes({ page: page + 1, limit: 12, filters }));
  };
  // console.log("all.length", all.length);
  // console.log("favorite", favorite);

  const favoriteObject = useMemo(() => {
    return (favorite || []).reduce((acc, cur) => {
      acc[cur._id] = true;
      return acc;
    }, {});
  }, [favorite, favorite?.length]);

  // const favoriteObject = useMemo(() => {
  //   return (favorite?.recipes || favorite || []).reduce((acc, cur) => {
  //     acc[cur._id] = true;
  //     return acc;
  //   }, {});
  // }, [favorite]);

  if (all?.length === 0 && searchQuery) {
    return <NoResult />;
  }
  return (
    <RecipeList
      recipes={all}
      page={page}
      totalPages={totalPages}
      onLoadMore={loadMore}
      favoriteObject={favoriteObject}
    />
  );
}
