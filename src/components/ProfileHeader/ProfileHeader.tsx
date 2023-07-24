import React from "react";
import { Avatar, Typography, Card, CardContent } from "@mui/material";
interface ProfileHeaderProps {
  username?: string;
  profilePhotoUrl?: string;
}
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({profilePhotoUrl, username}) => {
  return (
    <Card sx={{ mb: 1 }} elevation={0}>
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: 'center',
          flexDirection: "column",
          width: '100%'
        }}
      >
        <Avatar src={profilePhotoUrl} sx={{ height: "120px", width: "120px" }} />
        <div style={{alignItems: 'center', margin: "8px", display: 'flex', flexDirection: 'column', width: '100%'}}>
          <Typography sx={{fontWeight: 'bold'}}>@{username}</Typography>
          <Typography>A collection of stuff</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
