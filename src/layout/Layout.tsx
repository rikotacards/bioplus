import React from "react";
import { TopAppBar } from "../components/TopAppBar/TopAppBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

export const Layout: React.FC = () => {
  
  
  return (
    <div>
      <TopAppBar />
      <Outlet />
    </div>
  );
};
