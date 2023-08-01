import React from "react";
import { TopAppBar } from "../components/TopAppBar/TopAppBar";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  
  
  return (
    <div>
      <TopAppBar />
      <Outlet />
    </div>
  );
};
