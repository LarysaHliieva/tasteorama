import React, { useState, useEffect } from "react";
import css from "./LoadMoreBtn.module.css";
// import RecipeCard from "../RecipeCard/RecipeCard"; //

const LIMIT = 12;

const LoadMoreBtn = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (pageToLoad) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/recipes?page=${pageToLoad}&limit=${LIMIT}`);
      const data = await res.json();

      if (pageToLoad === 1) {
        setRecipes(data.recipes);
      } else {
        setRecipes((prev) => [...prev, ...data.recipes]);
      }

      setTotal(data.total);
    } catch (err) {
      console.error("Помилка при завантаженні рецептів:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(page);
  }, [page]);

  const handleLoadMore = () => {
    if (loading) return;
    setPage((prev) => prev + 1);
  };

  const allLoaded = recipes.length >= total;

  return (
    <div className={css.wrapper}>
      <div className={css.list}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {!allLoaded && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className={css.button}
        >
          {loading ? "Завантаження..." : "Завантажити ще"}
        </button>
      )}
    </div>
  );
};

export default LoadMoreBtn;
