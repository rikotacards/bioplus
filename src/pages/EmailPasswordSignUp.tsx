import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import './common.css'
import { addUsername, getUidFromUsername } from "../db/api";
import { signInWithEmailPassword } from "../util/signInWithEmailPassword";
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
interface EmailPasswordSignUpProps {
  onPrev?: () => void;
  userNameFromLanding?: string;
}
export const parseFirebaseErrorMessage = (errorMessage: string) => {
  return errorMessage.split(':')[1]

}
export const EmailPasswordSignUp: React.FC<EmailPasswordSignUpProps> = ({onPrev, userNameFromLanding}) => {
  const nav = useNavigate();
  const auth = useAuthContext();
  const [signUpObject, setSignUpObject] = React.useState<SignInObjectType>({
    username: {
      value: userNameFromLanding|| "",
      isLoading: !!userNameFromLanding ? true : false,
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

  const [signUpSuccess, setSignUpSuccess] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpObject((o) => ({
      ...o,
      [e.target.name]: { ...o[e.target.name], value: e.target.value, isLoading: undefined, error: undefined },
    }));
    console.log(signUpObject);
  };

  const setError = (field: string, hasError: boolean) => {
    setSignUpObject((o) => ({ ...o, [field]: { ...o[field], hasError } }));
  };
  const setErrorMessage = (field: string, errorMessage: string) => {
    setSignUpObject((o) => ({ ...o, [field]: { ...o[field], errorMessage } }));
  };
  const setLoading = (field: string, isLoading: boolean) => {
    setSignUpObject((o) => ({ ...o, [field]: { ...o[field], isLoading } }));
  };

  const onSuccess = () => {
    setSignUpSuccess(true);
  };

  const checkUsernameExist = (username: string) => {
    setLoading("username", true)
    setError("username", false);
    setErrorMessage("username", "");

    getUidFromUsername(username).then((res) => {
      if (res) {
        setError("username", true);
        setErrorMessage("username", "username exists");
        setLoading('username', false)
      } else {
        setError("username", false);
        setLoading('username', false)
        setErrorMessage("username", "");
      }
    });
  };
  const { email, password, username } = signUpObject;
  const onSignupClick = () => {
    if(!email?.value || !password?.value){
      return;
    }
    signInWithEmailPassword({ email: email.value, password: password.value })
      .then((res) => {
        if (res?.user) {
          res.user?.uid &&
            addUsername({ uid: res.user?.uid, username: username.value })
              .then((res) => {
                onSuccess();
                auth.setUsername(username.value);
                nav("/welcome");
              })
              .catch(() => {
                setError("username", true);
                setLoading('username', false)
                setErrorMessage("username", "Username has been taken");
              });
        }
      })
      .catch((e) => {
        const readable = parseFirebaseErrorMessage(e.message)
        setError("email", true)
        setLoginError(true);
        setLoginErrorMessage(readable || "");
      });
  };
  React.useEffect(() => {
    if(!userNameFromLanding){
      return;
    }
    checkUsernameExist(userNameFromLanding)
  }, [])

  console.log(username)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "0px 16px",
      }}
    >
      <Typography className='rainbow-text' pb={1} variant='h3' fontWeight={'bold'}>Almost there</Typography>
      <Typography pb={1} variant='body1' fontWeight={'bold'}>Create your username</Typography>

      <TextFieldCustom
        onChange={onChange}
        onBlur={() => checkUsernameExist(username.value)}
        error={username.hasError}
        sx={{ mb: 1 }}
        isLoading={username.isLoading}
        value={username.value}
        startAdornmentComponent={<InputAdornment sx={{mr:0.5}} position="start"><Typography>bioUp.io/</Typography></InputAdornment>}
        name="username"
        placeholder={"username"}
        helperText={username.errorMessage}
      />
      <div>
        <Card sx={{ mb: 1 }}>
          <CardContent>
            <Typography sx={{ mb: 1 }}>
              This will be your personal BioUp url. To login, you will
              still login via Email.
            </Typography>
          </CardContent>
        </Card>
      </div>
      <TextField
        error={email.hasError}
        value={email.value}
        sx={{ mb: 1 }}
        onChange={onChange}
        name="email"
        placeholder={"email"}
      />
      <TextField
        sx={{ mb: 1 }}
        error={password.hasError}
        value={password.value}
        onChange={onChange}
        name="password"
        type="password"
        placeholder="password"
      />
      <Button sx={{ mb: 1 }} onClick={onSignupClick} variant="contained">
        Create Account
      </Button>
      {loginError && (
        <Card sx={{mb:1, color: 'red'}}>
          <CardContent>
            {loginError && loginErrorMessage}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
