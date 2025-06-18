import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logOut } from "../auth/slice";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status = (action.payload as { status?: number })?.status;
    if (status === 401) {
      api.dispatch(logOut());
      toast.error("Session expired. Please sign in again.", { className: "notification" });
      console.log("Authentication failed");
    } else {
      toast.error("Something went wrong.", { className: "notification" });
    }
  }

  return next(action);
};
