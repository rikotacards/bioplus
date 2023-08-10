import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import React from "react";
import { addUsername, getUsernameDetails } from "../db/api";
import { signInWithEmailPassword } from "../util/signInWithEmailPassword";
import {  useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

interface SignInObjectType {
  [key: string]: {
    value: string;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string;
  }
}

export const EmailPasswordSignUp: React.FC = () => {
  const nav = useNavigate();
  const auth = useAuthContext();
  const [signUpObject, setSignUpObject] = React.useState<SignInObjectType>({
    username: {
      value: "",
      isLoading: false,
      hasError: false,
      errorMessage: "",
    },
    email: {
      value: "",
      isLoading: false,
      hasError: false,
      errorMessage: "",
    },
    password: {
      hasError: false,
      value: "",
      isLoading: false,
      errorMessage: ""
    }
  });

  const [signUpSuccess, setSignUpSuccess] = React.useState(false)
  const [loginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpObject((o) => ({ ...o, [e.target.name]: { ...o[e.target.name], value: e.target.value } }))
    console.log(signUpObject)
  }

  const setError = (field: string, hasError: boolean) => {
    setSignUpObject((o) => ({ ...o, [field]: { ...o[field], hasError } }))
  }
  const setErrorMessage = (field: string, errorMessage: string) => {
    setSignUpObject((o) => ({ ...o, [field]: { ...o[field], errorMessage } }))
  }


  const onSuccess = () => {
    setSignUpSuccess(true);
  };

  const checkUsernameExist = (username: string) => {
    getUsernameDetails(username).then((res) => {
      if (res) {
        setError('username', true)
        setErrorMessage("username", "username exists");
        throw new Error("username exists");
      } else {
        setError('username', false);
        setErrorMessage('username', "");
      }
    });
  };
  const { email, password, username } = signUpObject
  const onSignupClick = () => {
    signInWithEmailPassword({ email: email.value, password: password.value })
      .then((res) => {
        if (res?.user) {
          res.user?.uid &&
            addUsername({ uid: res.user?.uid, username: username.value })
              .then((res) => {
                onSuccess();
                auth.setUsername(username.value);
                nav("/admin");
              })
              .catch((e) => {
                setError('username', true);
                setErrorMessage('username', "Username has been taken");
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
        onChange={onChange}
        onBlur={() => checkUsernameExist(username.value)}
        error={username.hasError}
        sx={{ mb: 1 }}
        name="username"
        placeholder={"username"}
        helperText={username.errorMessage}
      />
      <div>
        <Card sx={{mb:1}}>
          <CardContent>

        <Typography sx={{mb:1}}>

This will be your personal BioUp url. However, to login you will still login via Email.
</Typography>
          </CardContent>
        </Card>
       
      </div>
      <TextField
        error={email.hasError}
        sx={{ mb: 1 }}
        onChange={onChange}
        name="email"
        placeholder={"email"}
      />
      <TextField
        sx={{ mb: 1 }}
        onChange={onChange}
        name="password"
        type="password"
        placeholder="password"
      />
      <Button sx={{ mb: 1 }} onClick={onSignupClick} variant="contained">
        Sign Up
      </Button>
      {loginError && <Card color='error'>
        <CardContent>

          {loginError && "Error Logging in" + loginErrorMessage}
        </CardContent>
      </Card>}
      <Button variant='outlined' onClick={() => nav('/')}>Back</Button>
    </div>
  );
};
