import { Fab } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Preview} from '../../components/Preview/Preview'
import { useDrawerContext } from "../../providers/DrawerProvider";
export const PreviewDrawerContent: React.FC = () => {
  const drawerContext = useDrawerContext();
  return (
    <>
      <Preview />
      <Fab
        sx={{
          position: "fixed",
          bottom: "0px",
          alignSelf: "center",
          margin: "20px",
        }}
        onClick={drawerContext.onToggle}
      >
        <CloseIcon />
      </Fab>
    </>
  );
};
