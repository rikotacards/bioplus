import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { MainNav } from "../MainNav/MainNav";
export const TopAppBar: React.FC = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex" }}>
          <Typography>Bio+</Typography>
        </Toolbar>
        <MainNav />
      </AppBar>
      <Toolbar />

      <Toolbar />

    </>
  );
};
