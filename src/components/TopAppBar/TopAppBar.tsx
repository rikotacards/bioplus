import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  LinearProgress,
  Paper,
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { MainNav } from "../MainNav/MainNav";
import { useOnSignIn } from "../../util/onSignIn";
import { useAuthContext } from "../../providers/AuthProvider";
import { useLoadingContext } from "../../providers/LoadingProvider";
import { useNavigate } from "react-router-dom";
import { getBrowser } from "../../platform/getBrowser";

export const TopAppBar: React.FC = () => {
  const auth = useAuthContext();
  const nav = useNavigate();
  const browser = getBrowser();
  const onSignIn = useOnSignIn();
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
      <AppBar position="fixed">
        <Paper elevation={isSafari ? 0 : 3} sx={{ borderRadius: 0 }}>
          {isSafari && mainBar}
          <MainNav />
          {loadingContext.isLoading && <LinearProgress />}
        </Paper>
      </AppBar>
      {isSafari && <Toolbar />}
      <Toolbar />
    </>
  );
};
