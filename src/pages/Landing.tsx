import React from "react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useOnSignIn } from "../util/onSignIn";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "../providers/AuthProvider";
import { onSignOut } from "../util/onSignOut";
export const Landing: React.FC = () => {
  const onSignIn = useOnSignIn();
  const nav = useNavigate();
  const auth = useAuthContext();

  const [text, setText] = React.useState("bioup.io/");
  const [ref, setRef] = React.useState("");
  const onClick = () => {
    setRef(document.referrer);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "4px",
        padding: "4px",
        marginTop: "32px",
      }}
    >
      <div>
        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h4">
          Your bio, upgraded. Everything you are, in one simple link in bio.
        </Typography>
      </div>
      {auth.isLoggedIn ? (
        <Button fullWidth onClick={onSignOut}>Sign Out</Button>
      ) : (
        <Button
          sx={{ mb: 0 }}
          size="large"
          onClick={() => nav("/signup")}
          fullWidth
          variant="contained"
        >
          Upgrade your bio
        </Button>
      )}
      <Divider sx={{ mt: 1, mb: 1 }} />
    </div>
  );
};
