import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";

interface EditManufacturerState {
  loading: boolean;
  success: boolean;
  error: string | undefined;
}

interface objType {
  name: {
    ar: string;
    en: string;
  };
  image: string;
  sort: string;
}

interface EditManufacturerArgs {
  editForm: objType;
  id: number;
  token: string | null;
}

const initialState: EditManufacturerState = {
  loading: false,
  success: false,
  error: "",
};

export const EditManufacturer = createAsyncThunk(
  "manufacturer/add",
  async ({ editForm, id, token }: EditManufacturerArgs) => {
    const response = await fetch(`${BASE_URL}/vendor/manufacturers/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(editForm),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  }
);

export const EditManufacturerSlice = createSlice({
  name: "editManufacturer",
  initialState,
  reducers: {
    resetEditManufacturerState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(EditManufacturer.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditManufacturer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(EditManufacturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetEditManufacturerState } = EditManufacturerSlice.actions;

export default EditManufacturerSlice.reducer;
