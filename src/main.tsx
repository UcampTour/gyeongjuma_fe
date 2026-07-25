import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../index.css";
import router from "./routes/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import "pretendard/dist/web/static/pretendard.css";
import "./i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DialogProvider } from "./providers/DialogProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DialogProvider>
            <RouterProvider router={router} />
          </DialogProvider>
        </ThemeProvider>
        {/* 리액트 쿼리 개발 캐싱 확인 도구 */}
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
