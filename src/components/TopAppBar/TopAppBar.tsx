import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { MainNav } from "../MainNav/MainNav";
import { onSignIn } from "../../util/onSignIn";
import { onSignOut } from "../../util/onSignOut";
import { useAuthContext } from "../../providers/AuthProvider";
import { useLoadingContext } from "../../providers/LoadingProvider";

export const TopAppBar: React.FC = () => {
  const auth = useAuthContext();
  const [click, setClick] = React.useState(false);
  const loadingContext = useLoadingContext();
  const isLoggedIn = auth?.isLoggedIn;
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex" }}>
          <Typography sx={{ fontWeight: "bold" }}>Bio+ </Typography>
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
              variant="outlined"
            >
              {isLoggedIn ? "Sign out" : "Sign In"}
            </Button>
          </div>
        </Toolbar>
        <MainNav />
        {loadingContext.isLoading && <LinearProgress />}
      </AppBar>
      <Toolbar />
      <Toolbar />
    </>
  );
};
