import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice";
import thunkMiddleware from "redux-thunk";

export const store = configureStore({
  // Here we will have our different slices
  reducer: {
    // user: authReducer,
    user: authReducer,
  },
  middleware: [thunkMiddleware],
});

// Dynamic return of store state and dispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
