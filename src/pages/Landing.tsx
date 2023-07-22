import React from "react";
import { useAuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { onSignIn } from "../util/onSignIn";
import { Button } from "@mui/material";
export const Landing: React.FC = () => {
  const auth = useAuthContext();
  const nav = useNavigate();
  
  return <div>Welcome to Rootlink <Button onClick={onSignIn}>Signin</Button></div>;
};
