import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavorites,
  getRecipeById,
  getRecipes,
  removeFromFavorites,
  getFavorites,
  getOwn,
  addOwnRecipe,
} from "./operations.js";

import { logout } from "../auth/slice.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialPagination = {
  page: 1,
  totalPages: 1,
  totalItems: 0,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    all: [],
    favorite: [],
    own: [],
    currentRecipe: null,
    isLoading: false,
    error: null,
    pagination: initialPagination,
    paginationFavorite: initialPagination,
    paginationOwn: initialPagination,
  },

  reducers: {
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRecipeById.pending, handlePending)
      .addCase(getRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(getRecipeById.rejected, handleRejected)

      .addCase(addToFavorites.pending, handlePending)
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorite = action.payload;
        state.paginationFavorite.totalItems = action.payload.length;
        state.paginationFavorite.page = 1;
      })
      .addCase(addToFavorites.rejected, handleRejected)

      .addCase(removeFromFavorites.pending, handlePending)
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorite = action.payload;
        state.paginationFavorite.totalItems = action.payload.length;
        state.paginationFavorite.page = 1;
      })
      .addCase(removeFromFavorites.rejected, handleRejected)

      .addCase(getRecipes.pending, handlePending)
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        const { recipes, pagination } = action.payload;

        if (pagination.page === 1) {
          state.all = recipes;
        } else {
          state.all = [...state.all, ...recipes];
        }

        state.pagination = pagination;
      })

      .addCase(getFavorites.pending, handlePending)
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        const { recipes, total, totalPages, currentPage } = action.payload;

        if (currentPage === 1) {
          state.favorite = recipes;
        } else {
          state.favorite = [...state.favorite, ...recipes];
        }

        state.paginationFavorite.page = currentPage;
        state.paginationFavorite.totalPages = totalPages;
        state.paginationFavorite.totalItems = total;
      })
      .addCase(getFavorites.rejected, handleRejected)

      .addCase(getOwn.pending, handlePending)
      .addCase(getOwn.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, page, totalPages, totalItems } = action.payload;

        if (page === 1) {
          state.own = data;
        } else {
          state.own = [...state.own, ...data];
        }

        state.paginationOwn = {
          page,
          totalPages,
          totalItems,
        };
      })
      .addCase(getOwn.rejected, handleRejected)

      .addCase(addOwnRecipe.pending, handlePending)
      .addCase(addOwnRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newRecipe = action.payload;
      })
      .addCase(addOwnRecipe.rejected, handleRejected)

      .addCase(logout, (state) => {
        state.favorite = [];
        state.own = [];
        state.currentRecipe = null;
        state.isLoading = false;
        state.error = null;
        state.pagination = initialPagination;
        state.paginationFavorite = initialPagination;
        state.paginationOwn = initialPagination;
      });
  },
});

export default recipesSlice.reducer;
export const { clearCurrentRecipe } = recipesSlice.actions;
