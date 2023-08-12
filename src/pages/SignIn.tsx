import { Button, Card, CardContent, Divider, TextField, Typography } from "@mui/material";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import "./SignIn.css";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { TextFieldCustom } from "./TextFieldCustom";
import { parseFirebaseErrorMessage } from "./EmailPasswordSignUp";

export const SignIn: React.FC = () => {
  const auth = getAuth();
  const nav = useNavigate();
  const provider = new GoogleAuthProvider();
  React.useEffect(() => {
    if (auth.currentUser?.uid) {
      nav("/admin");
    }
  }, [auth.currentUser?.uid]);

  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("")
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
    setError(false)
    setLoading(false)
  };
  const onPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    setLoading(false);
    setError(false)
  };

  const onSignInWithEmailPassword = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, pw).then((res) => {
      setLoading(false);
      setError(false);
      console.log('res', res)
    }).catch((e) => {
      setError(true)
      setLoading(false)
      setErrorMsg(parseFirebaseErrorMessage(e.message || "") as string)
      console.log(e.message)
    })
  };

  const onGoogleSignIn = () => {
    signInWithPopup(auth, provider).then(() => {
      nav("/admin");
    });
  };
  return (
    <div
      style={{
        marginTop: "8px",
        padding: "0px 16px",
        display: "flex",
        flexDirection: "column",
        overflowY: 'hidden',
      }}
    >
      <div style={{ marginBottom: "8px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Sign in with Email
        </Typography>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextFieldCustom
          sx={{ mb: 1 }}
          type="email"
          placeholder="email"
          onChange={onEmailChange}
          error={hasError}
          isLoading={isLoading}
        />
        <TextFieldCustom
          type="password"
          sx={{ mb: 2 }}
          placeholder="password"
          onChange={onPwChange}
          error={hasError}
          isLoading={isLoading}
        />
        {
          !!errorMsg &&  <div style={{padding: '8px', color: 'red'}}>{errorMsg}</div>
        }
        <Button
          size="large"
          sx={{ mb: 0 }}
          variant="contained"
          fullWidth
          onClick={onSignInWithEmailPassword}
        >
          Sign In
        </Button>
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "8px",
          marginBottom: "8px",
          overflow: 'hidden',
        }}
      >
        <Divider sx={{ width: "100%" }} />
        <Typography sx={{padding: 1}} variant="body1">Or</Typography>
        <Divider sx={{ width: "100%" }} />

      </div>
      <Button
        size="large"
        startIcon={<GoogleIcon />}
        sx={{ borderRadius: "20px", mb:1 }}
        fullWidth
        variant="contained"
        onClick={onGoogleSignIn}
      >
        Continue Google
      </Button>
      <Card color='inherit' variant='outlined'>
      
      <CardContent>
        <Typography>
          Google sign-in only works on the device browser and not via Instagram's in-app browser. However, you can continue with email and password with the form above.
        </Typography>
      </CardContent>
      </Card>
    </div>
  );
};
