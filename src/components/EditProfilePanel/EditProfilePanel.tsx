import {
  Avatar,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { updateBio } from "../../db/api";
export const EditProfilePanel: React.FC = () => {
  const auth = useAuthContext();
  const uid = auth?.user?.uid;
  const [bioText, setBioText]  = React.useState('')
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBioText(e.target.value);
  }
  const username = auth?.username
  return (
      <div
        style={{ display: "flex", width: "100%", flexDirection: "column" }}
      >
        <div style={{alignItems: 'center', padding: '4px', display: "flex" }}>
          <Avatar sx={{m:1, height: 100,width: 100}} />
          <div style={{alignItems: 'center', width: '100%', display: "flex", flexDirection: "column" }}>
            <Button sx={{mb:1}} fullWidth variant='contained'>
              <Typography>Pick an Image</Typography>
            </Button>
            <Button fullWidth variant='contained' >
              <Typography>Remove</Typography>
            </Button>
          </div>
        </div>
          <TextField disabled sx={{mb:1}} value={'@'+username} />
          <TextField rows={3} multiline onBlur={() => {uid && updateBio({uid, bio:bioText})}} onChange={onChange} placeholder="bio" />
      </div>
  );
};
