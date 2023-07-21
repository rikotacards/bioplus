import React from "react";
import { EditProfilePanel } from "../components/EditProfilePanel/EditProfilePanel";
import { Fab, Typography } from "@mui/material";
import { useDrawerContext } from "../providers/DrawerProvider";

export const Appearance: React.FC = () => {
  const drawerContext = useDrawerContext();
  return (
    <>
      <EditProfilePanel />
      <Fab
        variant="extended"
        onClick={drawerContext?.onToggle}
        sx={{ position: 
          "absolute", 
          bottom: " 0", 
          margin: 2, 
          left: "33%" }}
      >
        <Typography>Preview</Typography>
      </Fab>
    </>
  );
};
