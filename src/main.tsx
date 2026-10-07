import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { store } from "@/app/store";
import { queryClient } from "@/app/queryClient";
import { ThemeProvider } from "@/shared/hooks";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: "Cairo, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
              },
            }}
          />
        </ThemeProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
