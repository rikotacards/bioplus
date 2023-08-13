import React from "react";
import {
  Avatar,
  Typography,
  CardContent,
  Skeleton,
  Button,
} from "@mui/material";
import { useAuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
interface ProfileHeaderProps {
  username?: string;
  profilePhotoUrl?: string;
  bio?: string;
  name?: string;
}
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profilePhotoUrl,
  username,
  bio,
  name
}) => {
  const avatarStyle = { height: "150px", width: "150px" };
  console.log(name)
  return (
    <div style={{ padding: "0 16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {profilePhotoUrl ? (
          <Avatar src={profilePhotoUrl} sx={avatarStyle} />
        ) : (
          <Skeleton variant="circular" sx={avatarStyle} />
        )}
        <div
          style={{
            alignItems: "center",
            margin: "8px",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div style={{display: 'flex'}}>

          {name && (
            <Typography sx={{mr: 1, fontWeight: "900", fontSize: "18px" }}>
              {name}
            </Typography>
          )}

          <Typography sx={{ fontWeight: name ?"200" : "900", fontSize: "18px" }}>
            @{username || "Username"}
          </Typography>
          </div>
          <Typography>{bio}</Typography>
        </div>
      </div>
    </div>
  );
};
