import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { BASE_URL } from "../config";

interface NameType {
  en: string;
  ar: string;
}

interface Manufacturer {
  id: number;
  name: NameType;
  image: string;
  status: number;
  sort_order: number;
}

interface PageData {
  currentPage: number;
  from: number;
  per_page: number;
  total: number;
}

interface ManufacturerState {
  loading: boolean;
  tableData: Manufacturer[];
  pageData: PageData;
  error: string | null;
}

interface FetchDataArgs {
  perPage: number;
  searchValue: string;
  token: string | null;
}

const initialState: ManufacturerState = {
  loading: false,
  tableData: [],
  pageData: {
    currentPage: 1,
    from: 0,
    per_page: 10,
    total: 0,
  },
  error: null,
};

export const getManufacturer = createAsyncThunk(
  "manufacturer/fetchData",
  async ({ perPage, searchValue, token }: FetchDataArgs) => {
    const response = await fetch(
      `${BASE_URL}/vendor/manufacturers?per_page=${perPage}&search=${searchValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": "en",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  }
);

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getManufacturer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        state.tableData = action.payload.data;
        state.pageData = {
          currentPage: action.payload.pages.current_page,
          from: action.payload.pages.from,
          per_page: action.payload.pages.per_page,
          total: action.payload.pages.total,
        };
      })
      .addCase(getManufacturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default manufacturerSlice.reducer;
