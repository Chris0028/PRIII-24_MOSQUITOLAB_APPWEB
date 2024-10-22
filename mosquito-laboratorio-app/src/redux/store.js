import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import fileReducer from "./fileSlice";
import updateFileReducer from "./updateFileSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        file: fileReducer,
        updateFile: updateFileReducer,
    }
});

export default store;

