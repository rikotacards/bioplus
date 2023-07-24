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
import { onSignIn } from "../../util/onSignIn";
import { onSignOut } from "../../util/onSignOut";
import { useAuthContext } from "../../providers/AuthProvider";
import { useLoadingContext } from "../../providers/LoadingProvider";
import { useNavigate } from "react-router-dom";
import { getBrowser } from "../../platform/getBrowser";

export const TopAppBar: React.FC = () => {
  const auth = useAuthContext();
  const nav = useNavigate();
  const browser = getBrowser();
  const isSafari = browser && browser === "safari";
  const [click, setClick] = React.useState(false);
  const loadingContext = useLoadingContext();
  const isLoggedIn = auth?.isLoggedIn;
  const mainBar = (
    <Toolbar sx={{ display: "flex" }}>
      <div style={{ cursor: "pointer" }} onClick={() => nav("/")}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          BioUp
        </Typography>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <Button
          onClick={
            isLoggedIn
              ? onSignOut
              : () => {
                  onSignIn();
                  setClick(true);
                }
          }
          color="secondary"
          variant="contained"
        >
          {isLoggedIn ? "Sign out" : "Sign In"}
        </Button>
      </div>
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
