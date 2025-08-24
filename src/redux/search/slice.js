import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: {
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
