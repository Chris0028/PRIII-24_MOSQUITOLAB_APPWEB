import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateFile } from "../modules/file/services/GetUpdateFile"; // Servicio para obtener los datos de la API
// Thunk para obtener los datos del archivo
export const fetchFileById = createAsyncThunk(
  "getFile/fetchById",
  async (fileID) => {
    const response = await UpdateFile(fileID); // Llamada al servicio de API para obtener el archivo por ID
    return response.data; // Retorna los datos obtenidos
  }
);

const initialState = {
  file: null,
  loading: false,
  error: null,
};

export const updateFileSlice = createSlice({
  name: "getFile",
  initialState,
  reducers: {
    setUpdateFile: (state, action) => {
      state.file = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFileById.fulfilled, (state, action) => {
        state.file = action.payload;
        state.loading = false;
      })
      .addCase(fetchFileById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setUpdateFile } = updateFileSlice.actions;

export default updateFileSlice.reducer;
