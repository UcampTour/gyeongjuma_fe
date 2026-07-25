import { CssBaseline, ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "pretendard/dist/web/static/pretendard.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../index.css";
import { queryClient } from "./config/queryClient";
import "./i18n";
import { DialogProvider } from "./providers/DialogProvider";
import router from "./routes/router";
import { theme } from "./styles/theme";

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
