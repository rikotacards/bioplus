import React from "react";
import { useDrawerContext } from "../../providers/DrawerProvider";
import { Button, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
interface PublicProfileDrawerContentProps {
  username?: string;
}
export const PublicProfileDrawerContent: React.FC<
  PublicProfileDrawerContentProps
> = ({ username }) => {
  const drawerContext = useDrawerContext();
  const toggle = drawerContext.onToggle;
  const nav = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          fontWeight: "bold",
          padding:'16px',
        }}
      >
        @{username}
        <div>
          <IconButton sx={{ ml: "auto" }} onClick={toggle}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
     
      </div>
      <div style={{display: 'flex', flexDirection: 'column', margin:'16px'}}>
          <Typography fontWeight={'900'} marginBottom={2}>
            Create your BioUp
          </Typography>
        <Button variant='contained' onClick={() => {drawerContext.onToggle(); nav('/')}}>Sign up free</Button>
        </div>
    </div>
  );
};
