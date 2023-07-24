import { Drawer, Fab, Paper } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
interface DrawerContextProps {
  onToggle: () => void;
}
import { Preview } from "../components/Preview/Preview";
export const DrawerContext = React.createContext({} as DrawerContextProps);
export const useDrawerContext = () => React.useContext(DrawerContext);

interface DrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const onToggle = () => {
    setOpen(!open);
  };

  const context = {
    onToggle,
  };
  return (
    <DrawerContext.Provider value={context}>
      {props.children}
      <Drawer
        sx={{ display: "flex" }}
        anchor="bottom"
        onClose={onToggle}
        open={open}
      >
        <Paper elevation={0}>
          <Preview />
        </Paper>
        <Fab
          sx={{
            position: "fixed",
            bottom: "0px",
            alignSelf: "center",
            margin: "20px",
          }}
          onClick={onToggle}
        >
          <CloseIcon />
        </Fab>
      </Drawer>
    </DrawerContext.Provider>
  );
};
