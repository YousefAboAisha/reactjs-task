import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";

interface AddManufacturerState {
  loading: boolean;
  success: boolean;
  error: string | undefined;
}

interface AddManufacturerArgs {
  formData: FormData;
  token: string | null;
}

const initialState: AddManufacturerState = {
  loading: false,
  success: false,
  error: "",
};

export const addManufacturer = createAsyncThunk(
  "manufacturer/add",
  async ({ formData, token }: AddManufacturerArgs) => {
    const response = await fetch(`${BASE_URL}/vendor/manufacturers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  }
);

export const addManufacturerSlice = createSlice({
  name: "addManufacturer",
  initialState,
  reducers: {
    resetAddManufacturerState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
    },
  },
  extraReducers: {
    [addManufacturer.pending.type]: (state) => {
      state.loading = true;
    },
    [addManufacturer.fulfilled.type]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [addManufacturer.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { resetAddManufacturerState } = addManufacturerSlice.actions;

export default addManufacturerSlice.reducer;
