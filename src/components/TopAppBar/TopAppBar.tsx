import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  LinearProgress,
  Paper,
} from "@mui/material";
import { MainNav } from "../MainNav/MainNav";
import {  useOnSignIn } from "../../util/onSignIn";
import { onSignOut } from "../../util/onSignOut";
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
  const [click, setClick] = React.useState(false);
  const loadingContext = useLoadingContext();
  const isLoggedIn = auth?.isLoggedIn;
  const signOutButton = (
    <Button onClick={onSignOut}>
      out
    </Button>
  )
  const signInButton = <div style={{ marginLeft: "auto" }}>
  <Button
    onClick={
      onSignIn
    }
    color="secondary"
    variant="contained"
  >
    {isLoggedIn ? "Sign out" : "Sign In"}
  </Button>
</div>
  const mainBar = (
    <Toolbar sx={{ display: "flex" }}>
      <div style={{ cursor: "pointer" }} onClick={() => nav("/")}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          BioUp
        </Typography>
      </div>
      {isLoggedIn? signOutButton : signInButton}
    </Toolbar>
  );
  return (
    <>
      <AppBar position="fixed">
        <Paper elevation={3} sx={{ borderRadius: 0 }}>
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
