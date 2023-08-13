import React from "react";
import { TopAppBar } from "../components/TopAppBar/TopAppBar";
import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";

export const Layout: React.FC = () => {
  return (
    <div>
      <TopAppBar />
      <Outlet />
    </div>
  );
};
