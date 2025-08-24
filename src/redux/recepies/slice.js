import { createSlice } from "@reduxjs/toolkit";
import { getRecipeById } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
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
      .addCase(getRecipeById.rejected, handleRejected);
  },
});

export default recipesSlice.reducer;
