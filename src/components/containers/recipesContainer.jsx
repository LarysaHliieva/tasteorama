import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, getRecipes } from "../../redux/recipes/operations";
import { FadeLoader } from "react-spinners";
import {
  selectRecipes,
  selectRecipesFavorites,
  selectRecipesPage,
  selectRecipesTotalPages,
  selectRecipesLoading,
} from "../../redux/recipes/selectors";
import {
  selectFiltersCategories,
  selectFiltersIngredients,
  selectSearchQuery,
} from "../../redux/filters/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
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
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectRecipesLoading);

  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const filters = useMemo(() => {
    return { categories, ingredients, searchQuery };
  }, [categories, ingredients, searchQuery]);

  useEffect(() => {
    setIsInitialRequest(true);
    dispatch(getRecipes({ page: 1, limit: 12, filters })).finally(() =>
      setIsInitialRequest(false)
    );
    isLoggedIn && dispatch(getFavorites({ limit: 1000 }));
  }, [filters, dispatch]);

  const loadMore = () => {
    setLoadingMore(true);
    dispatch(getRecipes({ page: page + 1, limit: 12, filters })).finally(() =>
      setLoadingMore(false)
    );
  };

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

  if (loading && isInitialRequest) {
    return <FadeLoader color="#9b6c43" />;
  }

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
      loading={loadingMore}
    />
  );
}
