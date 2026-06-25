import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../index.css";
import router from "./routes/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import "pretendard/dist/web/static/pretendard.css";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
