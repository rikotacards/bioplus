import React from "react";
import {
  Button,

  Divider,
  
  Typography,
} from "@mui/material";
import './Landing.css'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { onSignOut } from "../util/onSignOut";
export const Landing: React.FC = () => {
  const nav = useNavigate();
  const auth = useAuthContext();

  

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
        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h3">
          Your bio,
        </Typography>
        <div className={'upgrade-text-container'}>
          
        <Typography variant='h3' sx={{mb:1, fontWeight: 'bold'}} className='rainbow-text'>
        Upgraded
        </Typography>
        </div>
        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h3">
        Everything you are, in one simple link in bio.
        </Typography>
      </div>
      {auth.isLoggedIn ? (
        <Button variant='outlined' sx={{marginTop: 'auto'}} fullWidth onClick={onSignOut}>Sign Out</Button>
      ) : (
        <div style={{textAlign:'center'}}>
        <Button
          sx={{ mb: 0, fontWeight: 'bold' }}
          size="large"
          onClick={() => nav("/signup")}
          fullWidth
          variant="contained"
        >
        <RocketLaunchIcon fontSize="small"/>  Upgrade your bio
        </Button>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Typography  variant='caption'>If you already have an account</Typography>
        <Button size='large'   onClick={() => {nav('/signIn')}} sx={{mt:'auto'}} fullWidth variant='outlined'>Sign in</Button>
        </div>
      )}
    </div>
  );
};
