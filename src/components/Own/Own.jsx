import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RecipeList } from "../RecipeList/RecipeList";

import {
  selectOwn,
  selectRecipesPage,
  selectRecipesTotalPages,
} from "../../redux/recipes/selectors";
import { getOwn } from "../../redux/recipes/operations";

import css from "./Own.module.css";

export default function Own() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectOwn);
  const page = useSelector(selectRecipesPage);
  const totalPages = useSelector(selectRecipesTotalPages);

  useEffect(() => {
    dispatch(getOwn());
  }, [dispatch]);

  const loadMore = () => {
    dispatch(getOwn({ page: page + 1, limit: 12 }));
  };

  return (
    <div>
      <div className={css.counter}>96 recipes</div>
      <RecipeList
        recipes={favorites}
        page={page}
        totalPages={totalPages}
        onLoadMore={loadMore}
        variant="details"
      />
    </div>
  );
}
