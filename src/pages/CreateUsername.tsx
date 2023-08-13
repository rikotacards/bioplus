import React from "react";
import "./common.css";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { addUsername, getUidFromUsername } from "../db/api";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { TextFieldCustom } from "./TextFieldCustom";
interface SignInObjectType {
  [key: string]: {
    value?: string;
    isLoading?: boolean;
    hasError?: boolean;
    errorMessage: string;
  };
}
export const CreateUsername: React.FC = () => {
  const nav = useNavigate();
  const auth = useAuthContext();
  const uid = auth?.user?.uid;
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
      errorMessage: "",
    },
  });
  const setError = (field: string, hasError: boolean) => {
    setSignUpObject((o) => ({ ...o, [field]: { ...o[field], hasError } }));
  };
  const setErrorMessage = (field: string, errorMessage: string) => {
    setSignUpObject((o) => ({ ...o, [field]: { ...o[field], errorMessage } }));
  };
  const setLoading = (field: string, isLoading: boolean) => {
    setSignUpObject((o) => ({ ...o, [field]: { ...o[field], isLoading } }));
  };
  const checkUsernameExist = (username: string) => {
    setLoading("username", true);
    setError("username", false);
    setErrorMessage("username", "");

    getUidFromUsername(username).then((res) => {
      if (res) {
        setError("username", true);
        setErrorMessage("username", "username exists");
        setLoading("username", false);
      } else {
        setError("username", false);
        setLoading("username", false);
        setErrorMessage("username", "");
      }
    });
  };
  const { username } = signUpObject;
  const onClick = () => {
    if (!uid || !username.value) {
      return;
    }
    addUsername({ uid: uid, username: username.value })
      .then((res) => {
        if (!username.value) {
          return;
        }
        auth.setUsername(username.value);
      }).then(() => nav('/welcome'))
      .catch(() => {
        setError("username", true);
        setLoading("username", false);
        setErrorMessage("username", "Username has been taken");
      });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpObject((o) => ({
      ...o,
      [e.target.name]: {
        ...o[e.target.name],
        value: e.target.value,
        isLoading: undefined,
        error: undefined,
      },
    }));
    console.log(signUpObject);
  };
  return (
    <div>
      <Typography
        className="rainbow-text"
        pb={1}
        variant="h3"
        fontWeight={"bold"}
      >
        Almost there
      </Typography>
      <Typography pb={1} variant="body1" fontWeight={"bold"}>
        Create your username
      </Typography>

      <TextFieldCustom
        onChange={onChange}
        fullWidth
        onBlur={() => username.value && checkUsernameExist(username.value)}
        error={username.hasError}
        sx={{ mb: 1 }}
        isLoading={username.isLoading}
        value={username.value}
        startAdornmentComponent={
          <InputAdornment sx={{ mr: 0.5 }} position="start">
            <Typography>bioUp.io/</Typography>
          </InputAdornment>
        }
        name="username"
        placeholder={"username"}
        helperText={username.errorMessage}
      />
      <Button fullWidth variant='contained' size="large" onClick={onClick}>Claim</Button>
    </div>
  );
};
