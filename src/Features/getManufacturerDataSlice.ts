import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";
import { BASE_URL } from "../config";

interface objType {
  name: {
    ar: string;
    en: string;
  };
  image: string;
  sort: string;
}

interface ManufacturerState {
  loading: boolean;
  success: boolean;
  error: string | null;
  fetchedData: objType;
}

interface FetchDataArgs {
  id: number;
  token: string | null;
  setEditForm: Dispatch<SetStateAction<objType>>;
}

const initialState: ManufacturerState = {
  loading: false,
  success: false,
  fetchedData: {
    name: {
      ar: "",
      en: "",
    },
    image: "",
    sort: "",
  },
  error: null,
};

export const getManufacturerDetails = createAsyncThunk(
  "manufacturer/fetchDetails",
  async ({ id, token, setEditForm }: FetchDataArgs) => {
    const response = await fetch(`${BASE_URL}/vendor/manufacturers/${id}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log(responseData);

    setEditForm({
      name: {
        ar: responseData.data.name.ar,
        en: responseData.data.name.en,
      },
      image: responseData.data.image,
      sort: responseData.data.sort_order,
    });

    return responseData;
  }
);

const getManufacturerData = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    resetgetfacturersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
    },
  },
  extraReducers: {
    [getManufacturerDetails.pending.type]: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [getManufacturerDetails.fulfilled.type]: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },

    [getManufacturerDetails.rejected.type]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message ?? "Unknown error";
    },
  },
});

export const { resetgetfacturersState } = getManufacturerData.actions;

export default getManufacturerData.reducer;
