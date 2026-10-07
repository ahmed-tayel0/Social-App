import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/shared/types";
import { STORAGE_KEYS } from "@/shared/lib/constants";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const readToken = () => localStorage.getItem(STORAGE_KEYS.TOKEN);
const readUser = () => {
  try {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    return userJson ? JSON.parse(userJson) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  token: readToken(),
  user: readUser(),
  isAuthenticated: !!readToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user?: User | null }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user ?? state.user;
      state.isAuthenticated = true;
      localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload.token);
      if (action.payload.user !== undefined) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload.user));
      }
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload === null) {
        localStorage.removeItem(STORAGE_KEYS.USER);
      } else {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload));
      }
    },
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    },
  },
});

export const { setCredentials, setUser, clearCredentials } = authSlice.actions;
export default authSlice.reducer;