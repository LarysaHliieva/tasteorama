import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FadeLoader } from "react-spinners";

import { RecipeList } from "../RecipeList/RecipeList";
import { NoResult } from "../NoResult/NoResult";

import {
  selectRecipesOwn,
  selectRecipesPage,
  selectRecipesTotalPages,
  selectRecipesTotalItems,
  selectRecipesLoading,
  selectRecipesError,
} from "../../redux/recipes/selectors";
import { getOwn } from "../../redux/recipes/operations";

import css from "./Own.module.css";

export default function Own() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectRecipesOwn);
  const page = useSelector(selectRecipesPage);
  const totalPages = useSelector(selectRecipesTotalPages);
  const selectedTotalItems = useSelector(selectRecipesTotalItems);
  const loading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);

  const [isInitialRequest, setIsInitialRequest] = useState(true);

  useEffect(() => {
    dispatch(getOwn());
  }, [dispatch]);

  const loadMore = () => {
    dispatch(
      getOwn({ page: page + 1, limit: 12 }).finally(() =>
        setIsInitialRequest(false)
      )
    );
  };

  if (loading && isInitialRequest) {
    return <FadeLoader color="#9b6c43" />;
  }

  if (error) return null;

  if (favorites.length === 0 && !loading && !error) {
    return <NoResult isButton={false} />;
  }

  return (
    <div>
      <div className={css.counter}>{selectedTotalItems} recepis</div>
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
