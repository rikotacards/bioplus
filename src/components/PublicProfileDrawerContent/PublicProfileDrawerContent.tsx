import React from "react";
import { useDrawerContext } from "../../providers/DrawerProvider";
import { AppBar, Button, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
interface PublicProfileDrawerContentProps {
  username?: string;
  toggle: () => void;
}
export const PublicProfileDrawerContent: React.FC<
  PublicProfileDrawerContentProps
> = ({ username , toggle}) => {
  const nav = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", borderTopLeftRadius: '50px', borderTopRightRadius: '50px' }}>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          fontWeight: "bold",
          padding:'16px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          overflow: 'hidden'
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
          <Typography fontWeight={'600'} marginBottom={2}>
            Create your BioUp
          </Typography>
        <Button variant='contained' onClick={() => {toggle(); nav('/')}}>Sign up free</Button>
        </div>
    </div>
  );
};
