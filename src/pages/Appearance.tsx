import React from "react";
import { EditProfilePanel } from "../components/EditProfilePanel/EditProfilePanel";
import { Fab, Typography } from "@mui/material";
import { useDrawerContext } from "../providers/DrawerProvider";
import { BackgroundSelector } from "../components/BackgroundSelector/BackgroundSelector";
import { BorderRadiusSelector } from "../components/BorderRadiusSelector/BorderRadiusSelector";

export const Appearance: React.FC = () => {
  const drawerContext = useDrawerContext();
  return (
    <div style={{position: 'relative', display: 'flex', flexDirection: 'column'}}>
      <EditProfilePanel />
      <BackgroundSelector/>
      <BorderRadiusSelector/>
      <Fab
        variant="extended"
        onClick={drawerContext?.onToggle}
        sx={{ position: 
          "fixed", 
          bottom: "0", 
          margin:'4px', 
          alignSelf: 'center'
          }}
      >
        <Typography sx={{textTransform: 'capitalize'}}>Preview</Typography>
      </Fab>
    </div>
  );
};
