import React from "react";
import { Avatar, Typography, CardContent, Skeleton } from "@mui/material";
interface ProfileHeaderProps {
  username?: string;
  profilePhotoUrl?: string;
  bio?: string;
}
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({profilePhotoUrl, username, bio}) => {
  const avatarStyle = {height:"150px", width: '150px'}
  return (
    <div>
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
        </div>
      </div>
    </div>
  );
};
