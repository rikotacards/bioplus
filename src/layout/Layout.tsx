import React from "react";
import { TopAppBar } from "../components/TopAppBar/TopAppBar";
import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";
import { ENABLE_TITLE_BAR } from "../configs/flags";

export const Layout: React.FC = () => {
  return (
    <div>
     {ENABLE_TITLE_BAR && <TopAppBar />}
      <Toolbar/>
      <Outlet />
    </div>
  );
};
