import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import fileReducer from "./fileSlice";
import updateFileReducer from "./updateFileSlice";
import formStepsReducer from "./formStepsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        file: fileReducer,
        updateFile: updateFileReducer,
        formSteps : formStepsReducer,
    }
});

export default store;

