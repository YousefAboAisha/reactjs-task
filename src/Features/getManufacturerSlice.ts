import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  success: boolean;
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
  success: false,
  tableData: [],
  pageData: {
    currentPage: 1,
    from: 0,
    per_page: 10,
    total: 0,
  },
  error: null,
};

export const getManufacturers = createAsyncThunk(
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

const getManufacturerSlice = createSlice({
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
    [getManufacturers.pending.type]: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [getManufacturers.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.success = true;

      state.tableData = action.payload.data;
      state.pageData = {
        currentPage: action.payload.pages.current_page,
        from: action.payload.pages.from,
        per_page: action.payload.pages.per_page,
        total: action.payload.pages.total,
      };
    },

    [getManufacturers.rejected.type]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message ?? "Unknown error";
    },
  },
});

export const { resetgetfacturersState } = getManufacturerSlice.actions;

export default getManufacturerSlice.reducer;
