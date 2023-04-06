import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";

type objType = {
  email: string;
  password: string;
};

export const login = createAsyncThunk(
  "auth/login",
  async (formData: objType) => {
    const response = await fetch(`${BASE_URL}/vendor/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data.token;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: localStorage.getItem("token"),
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload);
        state.token = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default authSlice.reducer;
