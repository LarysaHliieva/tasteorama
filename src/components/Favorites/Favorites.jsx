import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FadeLoader } from "react-spinners";

import { RecipeList } from "../RecipeList/RecipeList";
import { NoResult } from "../NoResult/NoResult";

import {
  selectRecipesFavorites,
  // selectRecipesTotalItems,
  // selectRecipesTotalPages,
  // selectRecipesTotalItems,
  selectRecipesLoading,
  selectRecipesError,
} from "../../redux/recipes/selectors";
import { getFavorites } from "../../redux/recipes/operations";

import css from "./Favorites.module.css";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectRecipesFavorites);
  // const page = useSelector(selectRecipesPage);
  // const totalPages = useSelector(selectRecipesTotalPages);
  // const selectedTotalItems = useSelector(selectRecipesTotalItems);
  const loading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  const loadMore = () => {
    // dispatch(getFavourite({ page: page + 1, limit: 12 }));
  };

  if (loading) {
    return <FadeLoader color="#9b6c43" />;
  }

  if (error) return null;

  if (favorites.length === 0 && !loading) {
    return <NoResult isButton={false} />;
  }

  return (
    <div>
      <div className={css.counter}>{favorites.length} recepis</div>
      <RecipeList
        recipes={favorites}
        // page={page}
        // totalPages={totalPages}
        onLoadMore={loadMore}
        variant="favorites"
      />
    </div>
  );
}
