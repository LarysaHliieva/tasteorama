import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RecipeList } from "../RecipeList/RecipeList";

import { selectFavorites } from "../../redux/recipes/selectors";
import { getFavorites } from "../../redux/recipes/operations";

import css from "./Favorites.module.css";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  // const page = useSelector(selectRecipesPage);
  // const totalPages = useSelector(selectRecipesTotalPages);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  const loadMore = () => {
    // dispatch(getFavourite({ page: page + 1, limit: 12 }));
  };

  return (
    <div>
      <div className={css.counter}>96 recipes</div>
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
