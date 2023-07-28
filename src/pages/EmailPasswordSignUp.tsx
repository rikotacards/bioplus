import { Button, Card, CardContent, TextField } from "@mui/material";
import React from "react";
import { addUsername, getUsernameDetails } from "../db/api";
import { signInWithEmailPassword } from "../util/signInWithEmailPassword";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

export const EmailPasswordSignUp: React.FC = () => {
  const nav = useNavigate();
  const auth = useAuthContext();
  const [signUpObject, setSignUpObject] = React.useState({
    username: {
      username: "",
      isLoading: "",
      hasError: false,
      errorMessage: "",
    },
    signUpFinal: {
      isLoading: false, 
      hasError: false, 
      errorMessage: ""
    },
    password: {
      hasError: false
    }
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");

  
  const onSuccess = () => {
    setSuccess(true);
  };
  const onPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const checkUsernameExist = (username: string) => {
    console.log("user", username);
    getUsernameDetails(username).then((res) => {
      if (res) {
        setUsernameError(true);
        setErrorMessage("username exists");
        throw new Error("username exists");
      } else {
        setUsernameError(false);
        setErrorMessage("");
      }
    });
  };

  const onSignupClick = () => {
    signInWithEmailPassword({ email, password })
      .then((res) => {
        if (res?.user) {
          res.user?.uid &&
            addUsername({ uid: res.user?.uid, username })
              .then((res) => {
                onSuccess();
                auth.setUsername(username);
                nav("/admin");
              })
              .catch((e) => {
                setUsernameError(true);
                setErrorMessage("Username has been taken");
              });
        }
      })
      .catch((e) => {
        console.log(e);
        setLoginError(true);
        setLoginErrorMessage(e);
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", paddingTop: '8px' }}>
      <TextField
        onChange={onUsernameChange}
        onBlur={() => checkUsernameExist(username)}
        error={usernameError}
        sx={{ mb: 1 }}
        name="username"
        placeholder={"username"}
        helperText={errorMessage}
      />
      <TextField
        error={emailError}
        sx={{ mb: 1 }}
        onChange={onEmailChange}
        name="email"
        placeholder={"email"}
      />
      <TextField
        sx={{ mb: 1 }}
        onChange={onPwChange}
        name="password"
        type="password"
        placeholder="password"
      />
      <Button sx={{mb:1}} onClick={onSignupClick} variant="contained">
        Sign Up
      </Button>
      {loginError && <Card color='error'>
        <CardContent>

      {loginError && "Error Logging in" + loginErrorMessage}
        </CardContent>
      </Card>}
    </div>
  );
};
