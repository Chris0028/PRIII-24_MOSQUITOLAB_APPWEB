import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    file: null
};

export const updateFileSlice = createSlice({
    name: 'getFile',
    initialState: initialState,
    reducers: {
        setUpdateFile: (state, action) => {
            state.file = action.payload;
        },
        clearUpdateFile: (state, action) => {
            state.file = null;
        },
    }
});

export const { setUpdateFile } = updateFileSlice.actions;

export default updateFileSlice.reducer;
