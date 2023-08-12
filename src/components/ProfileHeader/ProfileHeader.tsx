import React from "react";
import { Avatar, Typography, CardContent, Skeleton, Button } from "@mui/material";
import { useAuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
interface ProfileHeaderProps {
  username?: string;
  profilePhotoUrl?: string;
  bio?: string;
}
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({profilePhotoUrl, username, bio}) => {
  const avatarStyle = {height:"150px", width: '150px'}
  const auth = useAuthContext();
  const nav = useNavigate();
  const usernameFromPath = location.pathname.split("/").join("");
  const showEdit = usernameFromPath === auth.username
  return (
    <div style={{padding: '0 16px'}}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: 'center',
          flexDirection: "column",
          width: '100%'
        }}
      >
       {profilePhotoUrl? <Avatar src={profilePhotoUrl} sx={avatarStyle} />: <Skeleton variant='circular' sx={avatarStyle} />}
        <div style=
        {{alignItems: 'center',
         margin: "8px",
          display: 'flex',
           flexDirection: 'column',
            width: '100%', 
      }}>
          <Typography sx={{fontWeight: '900', fontSize:'18px'}}>@{username||'Username'}</Typography>
          <Typography>{bio}</Typography>
          {showEdit && <Button variant='outlined' color='inherit' onClick={()=>nav('/signIn')} fullWidth>Sign in to edit</Button>}
        </div>
      </div>
    </div>
  );
};
