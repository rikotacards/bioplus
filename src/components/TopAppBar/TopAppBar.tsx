import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  LinearProgress,
  Paper,
  Divider,
  Zoom,
  Collapse,
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { MainNav } from "../MainNav/MainNav";
import { useOnSignIn } from "../../util/onSignIn";
import { useAuthContext } from "../../providers/AuthProvider";
import { useLoadingContext } from "../../providers/LoadingProvider";
import { useNavigate } from "react-router-dom";
import { getBrowser } from "../../platform/getBrowser";
import { ENABLE_BOTTOM_BAR } from "../../configs/flags";
import { useDrawerContext } from "../../providers/DrawerProvider";

export const TopAppBar: React.FC = () => {
  const auth = useAuthContext();
  const nav = useNavigate();
  const browser = getBrowser();
  const onSignIn = useOnSignIn();
  const drawerContext = useDrawerContext();
  const onAdd = () => {
    drawerContext.setComponent('addLink')
    drawerContext.onToggle();
  }
  const isSafari = browser && browser === "safari";
  const loadingContext = useLoadingContext();
  const isLoggedIn = auth?.isLoggedIn;
  const [isCopied, setIsCopied] = React.useState(false);
  const onClick = () => {
    if (!auth?.username) {
      return;
    }
    setIsCopied(true)
    navigator.clipboard.writeText(`bioUp.io/${auth?.username}`)

    setTimeout(() => { setIsCopied(false) }, 1000)
  }

  const signInButton = <div style={{ marginLeft: "auto" }}>
    <Button
      onClick={
       () => nav('/signIn')
      }
      sx={{ textTransform: 'capitalize' }}
      color="primary"
      variant="contained"
    >
      {isLoggedIn ? "Sign out" : "Sign In"}
    </Button>
  </div>
  const mainBar = (
    <Toolbar sx={{ display: "flex", alignItems: 'center' }}>
      <div style={{ cursor: "pointer" }} onClick={() => nav("/")}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          BioUp
        </Typography>
      </div>
      {!isLoggedIn && signInButton}
      {isLoggedIn && <Button onClick={onClick} sx={{ textTransform: 'capitalize', borderRadius: '150px', ml: 'auto' }} variant='contained'><ContentCopyIcon fontSize='small' />{isCopied ? ' Copied' : ' Share'}</Button>}
    </Toolbar>
  );
  return (
    <>
      <AppBar sx={ENABLE_BOTTOM_BAR ? { top: 'auto', bottom: 0 } : {}} position="fixed">
        <Paper elevation={isSafari ? 0 : 3} sx={{ borderRadius: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {ENABLE_BOTTOM_BAR && <Divider/>}
          {ENABLE_BOTTOM_BAR &&  <Collapse in={location.pathname ==='/admin'}><Button fullWidth sx={{marginTop: '8px', borderRadius:'50px', textTransform: 'capitalize'}} variant='contained' size='large' onClick={onAdd}>Add Link</Button></Collapse>}

          {!ENABLE_BOTTOM_BAR && isSafari && mainBar}
          <MainNav />
          {loadingContext.isLoading && <LinearProgress />}
          {ENABLE_BOTTOM_BAR && <div style={{height:'5px'}}/>}
        </Paper>
      </AppBar>
      {!ENABLE_BOTTOM_BAR && isSafari && <Toolbar />}
      {!ENABLE_BOTTOM_BAR && <Toolbar />}
    </>
  );
};
