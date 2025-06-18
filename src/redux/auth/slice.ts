import type { AuthSliceState } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthSliceState = {
  user: JSON.parse(sessionStorage.getItem("user") || "{}").user,
  token: JSON.parse(sessionStorage.getItem("user") || "{}").token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCreddentials(state, action: PayloadAction<AuthSliceState>) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      sessionStorage.setItem("user", JSON.stringify(state));
    },
    logOut(state) {
      state.user = null;
      state.token = null;
      sessionStorage.clear();
    },
  },
});

export const { setCreddentials, logOut } = authSlice.actions;

export default authSlice.reducer;
