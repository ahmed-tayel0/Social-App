import axios, { AxiosError, type AxiosInstance } from "axios";
import { API_BASE_URL, STORAGE_KEYS } from "@/shared/lib/constants";

/**
 * Central axios instance.
 * - Base URL comes from constants (env-driven).
 * - Request interceptor injects the token from localStorage.
 * - Response interceptor normalizes errors + handles expired tokens.
 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json" },
  timeout: 30_000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  // config.headers["Cache-Control"] = "no-cache";
  // config.headers["Pragma"] = "no-cache";
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    // If the backend says the token is invalid/expired → clear and reload
    if (typeof message === "string" && message.toLowerCase().includes("token")) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      // Don't hard-reload here; the app will react to Redux state.
    }

    return Promise.reject(new Error(message));
  }
);
