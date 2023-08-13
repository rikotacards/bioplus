import React from "react";
import { useDrawerContext } from "../../providers/DrawerProvider";
import { AppBar, Button, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import '../../pages/Landing.css'
interface PublicProfileDrawerContentProps {
  username?: string;
  toggle: () => void;
}
export const PublicProfileDrawerContent: React.FC<
  PublicProfileDrawerContentProps
> = ({ username, toggle }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const onClick = () => {
  
    setIsCopied(true);
    navigator.clipboard.writeText(`bioUp.io/${username}`);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const nav = useNavigate();
  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          fontWeight: "bold",
          padding: "16px",
          marginLeft: "auto",
          overflow: "hidden",
        }}
      >
        <div
          style={{ width: '100%',  display: "flex", flexGrow: "1"}}
        ></div>
        <div style={{ width: '100%', flexGrow: "1", display: "flex", textAlign: 'center', justifyContent: 'center' }}>
          @{username}</div>
        <div style={{ width: '100%', flexShrink: "1", display: "flex", justifyContent: 'flex-end',marginLeft: "auto" }}>
          <IconButton onClick={toggle}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", margin: "16px" }}>
        <Typography  fontWeight={"600"} marginBottom={1}>
         Join @{username} and create your BioUp
        </Typography>
        <Button
        sx={{textTransform: 'capitalize'}}
        className='next-button'
        size='large'
          variant="contained"
          onClick={() => {
            toggle();
            nav("/");
          }}
        >
          Create your bioUp profile <RocketLaunchIcon sx={{ml:1}}/>
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", margin: "16px" }}>
        <Typography  marginBottom={1}>
          Share profile
        </Typography>
        <Button
        size='large'
          variant="contained"
          sx={{textTransform: 'capitalize'}}
          onClick={onClick}
        >
          <ContentCopyIcon sx={{mr:1}}/>{isCopied ? 'Copied' :`Copy bioUp url: bioup/${username}`}
        </Button>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", margin: "16px" }}>
        <Typography  marginBottom={1}>
          Sign in to edit
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            toggle();
            nav("/signIn");
          }}
        >
          Sign In
        </Button>
      </div>

      
    </div>
  );
};
