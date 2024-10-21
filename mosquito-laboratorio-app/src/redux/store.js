import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import fileReducer from "./fileSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        file: fileReducer,
    }
});

export default store;