import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    categories: [],
    ingredients: [],
  },
  reducers: {},
});

export default slice.reducer;
