import { configureStore } from "@reduxjs/toolkit";
import popupReducer from './popupslice'

const store = configureStore({
    reducer:{
        popup: popupReducer
    }
})

export default store;