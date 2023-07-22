import {
  Avatar,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
export const EditProfilePanel: React.FC = () => {
  return (
    <Card>
      <CardContent
        sx={{ display: "flex", width: "100%", flexDirection: "column" }}
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
          <TextField sx={{mb:1}}  />
          <TextField   placeholder="bio" />
      </CardContent>
    </Card>
  );
};
