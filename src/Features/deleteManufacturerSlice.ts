import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";

interface DeleteManufacturerState {
  loading: boolean;
  success: boolean;
  error: string | undefined;
}

interface DeleteManufacturerArgs {
  id: number;
  token: string | null;
}

const initialState: DeleteManufacturerState = {
  loading: false,
  success: false,
  error: "",
};

export const deleteManufacturer = createAsyncThunk(
  "manufacturer/add",
  async ({ id, token }: DeleteManufacturerArgs) => {
    const response = await fetch(`${BASE_URL}/vendor/manufacturers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  }
);

export const DeleteManufacturerSlice = createSlice({
  name: "DeleteManufacturer",
  initialState,
  reducers: {
    resetDeleteManufacturerState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteManufacturer.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteManufacturer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteManufacturer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export const { resetDeleteManufacturerState } = DeleteManufacturerSlice.actions;

export default DeleteManufacturerSlice.reducer;
