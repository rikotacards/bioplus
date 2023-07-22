import React from "react";
import { TopAppBar } from "../components/TopAppBar/TopAppBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { useLoadingContext } from "../providers/LoadingProvider";
import { useAuthContext } from "../providers/AuthProvider";

export const Layout: React.FC = () => {
  const loadingContext = useLoadingContext();
  const auth = useAuthContext();
  const nav = useNavigate();
  
  return (
    <div>
      <TopAppBar />
     <Outlet/>
    </div>
  );
};
