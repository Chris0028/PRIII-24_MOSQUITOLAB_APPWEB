import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import fileReducer from "./fileSlice";
import formStepsReducer from "./formStepsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        file: fileReducer,
        formSteps : formStepsReducer,
    }
});

export default store;

