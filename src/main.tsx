import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import appTheme from './configs/appTheme.ts'
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
