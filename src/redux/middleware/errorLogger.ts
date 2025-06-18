import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { logOut } from "../auth/slice";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status = (action.payload as { status?: number })?.status;
    if (status === 401) {
      api.dispatch(logOut());
      console.log("Authentication failed");
    }
  }

  return next(action);
};
