import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConfirmShow: false,
  messages: "",
  onConfirm: null,
};

const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    showConfirm: (state, action) => {
      state.isConfirmShow = true;
      state.messages = action.payload.message;
      state.onConfirm = action.payload.onConfirm || null;
    },
    hideConfirm: (state) => {
      state.isConfirmShow = false;
      state.messages = "";
      state.onConfirm = null;
    },
  },
});

export const { showConfirm, hideConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;
