import RecipeCard from "../RecipeCard/RecipeCard";
import css from "../RecipeList/recipeList.module.css";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export function RecipeList({
  recipes,
  page,
  totalPages,
  onLoadMore,
  variant,
  favoriteObject,
}) {
  return (
    <div>
      <div className={css.recipeList}>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe._id || index}
            title={recipe.title}
            description={recipe.description}
            thumb={recipe.thumb}
            time={recipe.time}
            calories={recipe.calories}
            id={recipe._id}
            variant={variant}
            isFavorite={favoriteObject?.[recipe._id]}
          />
        ))}
      </div>

      {page < totalPages && <LoadMoreBtn onClick={onLoadMore} />}
    </div>
  );
}
