import { rtkQueryErrorLogger } from "./middleware/errorLogger";
import { authAPI } from "./api/authAPI";
import { tripAPI } from "./api/tripAPI";
import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth/slice";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [tripAPI.reducerPath]: tripAPI.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authAPI.middleware, tripAPI.middleware, rtkQueryErrorLogger]),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
