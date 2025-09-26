import { configureStore } from "@reduxjs/toolkit";
import popupReducer from './popupslice'
import confirmReducer from './confirmSlice'

const store = configureStore({
    reducer:{
        popup: popupReducer,
        confirm: confirmReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }),
})

export default store;