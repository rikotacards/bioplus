import React from "react";
import { Avatar, Typography, Card, CardContent } from "@mui/material";
interface ProfileHeaderProps {
  username?: string;
}
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({username}) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar sx={{ height: "120px", width: "120px" }} />
        <div style={{ margin: "8px" }}>
          <Typography>@{username}</Typography>
          <Typography>This is my bio</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
