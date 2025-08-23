import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    categories: null,
    ingredients: null,
  },
  reducers: {},
});

export default slice.reducer;
