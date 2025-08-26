import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: true,
  },
});

export default slice.reducer;
