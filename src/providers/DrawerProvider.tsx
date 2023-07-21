import { AppBar, Drawer, Fab, IconButton, Toolbar } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Profile } from "../pages/Profile";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Preview } from "../components/Preview/Preview";
export const DrawerContext = React.createContext({});
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
        <Preview />
        <Fab
          sx={{
            position: "fixed",
            bottom: "0px",
            alignSelf: "center",
            margin: "20px",
          }}
        >
          <IconButton onClick={onToggle}>
            <CloseIcon />
          </IconButton>
        </Fab>
      </Drawer>
    </DrawerContext.Provider>
  );
};
