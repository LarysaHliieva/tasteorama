import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FadeLoader } from "react-spinners";

import { RecipeList } from "../RecipeList/RecipeList";
import { NoResult } from "../NoResult/NoResult";

import {
  selectRecipesOwn,
  selectRecipesLoading,
  selectRecipesError,
  paginationOwn,
} from "../../redux/recipes/selectors";
import { getOwn } from "../../redux/recipes/operations";

import css from "./Own.module.css";

export default function Own() {
  const dispatch = useDispatch();
  const own = useSelector(selectRecipesOwn);
  const { page, totalPages, totalItems } = useSelector(paginationOwn);
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

  if (own.length === 0 && !loading && !error) {
    return <NoResult isButton={false} />;
  }

  return (
    <div>
      <div className={css.counter}>{totalItems} recepis</div>
      <RecipeList
        recipes={own}
        page={page}
        totalPages={totalPages}
        onLoadMore={loadMore}
        variant="details"
      />
    </div>
  );
}
