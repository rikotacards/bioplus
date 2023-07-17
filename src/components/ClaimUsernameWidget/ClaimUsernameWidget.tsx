import React from "react";
import { Button,Typography, TextField, Card, CardContent } from "@mui/material";
export const ClaimUsernameWidget: React.FC = () => {
  return (
    <Card elevation={2} sx={{mb:1}}>
      <CardContent>
        <div style={{display: 'flex'}}>
          <Typography>Claim Username</Typography>
        </div>
        <div>
        <TextField size="small" variant="outlined" />
        <Button sx={{ml:1}} variant='contained'>Claim</Button>
        </div>
      </CardContent>
    </Card>
  );
};
