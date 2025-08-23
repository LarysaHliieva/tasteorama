import { createSlice } from "@reduxjs/toolkit";

// const handlePending = (state) => {
//   state.loading = true;
//   state.success = null;
// };

// const handleRejected = (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// };

const slice = createSlice({
  name: "recepies",
  initialState: {
    all: [],
    favorite: [],
    own: [],
    loading: false,
    error: null,
  },
  extraReducers: () => {},
});

export default slice.reducer;
