import React from "react";
import {
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import "./Landing.css";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { ENABLE_BOTTOM_BAR } from "../configs/flags";
export const enableSignUpOnLanding = true;

interface LandingProps {
  onNext?: () => void;
  onPrev?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Landing: React.FC<LandingProps> = ({ onNext, onChange }) => {
  const nav = useNavigate();
  const auth = useAuthContext();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0px 16px",
        marginTop: ENABLE_BOTTOM_BAR ? "8px" :"36px",
      }}
    >
      <div>
        <div className={"upgrade-text-container"}>
          <Typography sx={{ fontWeight: "900", mb: 0 }} variant="h3">
            Your bio,
          </Typography>
          <Typography
            variant="h3"
            sx={{ mb: 1, fontWeight: "900" }}
            className="rainbow-text"
          >
            Upgraded.
          </Typography>

          <Typography variant="h3" sx={{ mb: 1, fontWeight: "900" }}>
            One link,
          </Typography>
          <Typography
            variant="h3"
            sx={{ mb: 1, fontWeight: "900" }}
            className="rainbow-text"
          >
            infinite connections.
          </Typography>
        </div>
        <Typography sx={{ fontWeight: "900", mb: 0 }} variant="h4"></Typography>
        <Typography sx={{ fontWeight: "700", mb: 2 }} variant="h6">
          Who you are, what you've created, everything that matters, all in one
          place.
        </Typography>
      </div>
      {!auth.isLoggedIn && (
        <div style={{ textAlign: "center" }}>
          {!enableSignUpOnLanding && (
            <Button
              sx={{ mb: 0, fontWeight: "bold" }}
              size="large"
              onClick={() => nav("/signup")}
              fullWidth
              variant="contained"
            >
              <RocketLaunchIcon fontSize="small" /> Upgrade your bio
            </Button>
          )}
          {enableSignUpOnLanding && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                placeholder={"username"}
                fullWidth
                onChange={onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment sx={{ mr: 0.5 }} position="start">
                      <Typography>bioUp.io/</Typography>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <Button
              className='next-button'
                fullWidth
                size="large"
                sx={{ mt: 1 }}
                variant="contained"
                onClick={onNext}
              >
                Next
              </Button>
            </div>
          )}
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography variant="caption">
            If you already have an account
          </Typography>
          <Button
            size="large"
            onClick={() => {
              nav("/signIn");
            }}
            sx={{ mt: "auto" }}
            fullWidth
            variant="outlined"
          >
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
};
