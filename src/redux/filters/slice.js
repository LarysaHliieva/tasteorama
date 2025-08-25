import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    categories: [],
    ingredients: [],
    searchQuery: "",
  },
  reducers: {
    changeSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export default slice.reducer;

export const { changeSearch } = slice.actions;
