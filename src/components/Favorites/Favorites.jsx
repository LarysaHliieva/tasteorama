import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FadeLoader } from "react-spinners";

import { RecipeList } from "../RecipeList/RecipeList";
import { NoResult } from "../NoResult/NoResult";

import {
  selectRecipesFavorites,
  selectRecipesLoading,
  selectRecipesError,
  paginationFavorite,
} from "../../redux/recipes/selectors";
import { getFavorites } from "../../redux/recipes/operations";

import css from "./Favorites.module.css";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectRecipesFavorites);
  const { page, totalPages, totalItems } = useSelector(paginationFavorite);
  const loading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);

  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    dispatch(getFavorites({ page: 1, limit: 12 })).finally(() =>
      setIsInitialRequest(false)
    );
  }, [dispatch]);

  const favoriteObject = useMemo(() => {
    return (favorites || []).reduce((acc, recipe) => {
      acc[recipe._id] = true;
      return acc;
    }, {});
  }, [favorites]);

  const loadMore = () => {
    setLoadingMore(true);
    dispatch(getFavorites({ page: page + 1, limit: 12 })).finally(() =>
      setLoadingMore(false)
    );
  };

  if (loading && isInitialRequest) {
    return <FadeLoader color="#9b6c43" />;
  }

  if (error) return null;

  if (favorites.length === 0 && !loading) {
    return <NoResult isButton={false} />;
  }

  return (
    <div>
      <div className={css.counter}>{totalItems} recipes</div>
      <RecipeList
        recipes={favorites}
        page={page}
        totalPages={totalPages}
        onLoadMore={loadMore}
        variant="favorites"
        favoriteObject={favoriteObject}
        loading={loadingMore}
      />
    </div>
  );
}
