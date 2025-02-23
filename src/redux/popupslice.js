import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPopupShow: false,
  message:""
};

const popupSlice = createSlice({
  name: "popup",
  initialState: initialState,
  reducers: {
    showPopup: (state, action) => {
      state.isPopupShow = true;
      state.message = action.payload
    },
    hidePopup: (state) => {
      state.isPopupShow = false;
    },
  },
});

export const{showPopup, hidePopup} = popupSlice.actions;
export default popupSlice.reducer;