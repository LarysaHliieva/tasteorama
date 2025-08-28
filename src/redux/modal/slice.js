import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: "",
  desc: "",
  confirmText: "OK",
  cancelText: "Cancel",
  onConfirm: null,
  onCancel: null,
  type: "confirm",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state = {
        ...initialState,
        ...action.payload,
        isOpen: true,
      };
      return state;
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
