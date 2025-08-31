export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;

export const selectRecipes = (state) => state.recipes.all;

export const selectRecipesPage = (state) => state.recipes.pagination.page;

export const selectRecipesTotalPages = (state) =>
  state.recipes.pagination.totalPages;

export const selectRecipesTotalItems = (state) =>
  state.recipes.pagination.totalItems;

export const selectRecipesLoading = (state) => state.recipes.isLoading;

export const selectRecipesFavorites = (state) => state.recipes.favorite;

export const selectRecipesOwn = (state) => state.recipes.own;
