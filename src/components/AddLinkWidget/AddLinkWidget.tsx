import React from "react";
import { Button,Typography, TextField, Card, CardContent } from "@mui/material";
export const AddLinkWidget: React.FC = () => {
  return (
    <Card sx={{mb:1}}>
      <CardContent>
        <div style={{display: 'flex'}}>
          <Typography>Enter URL</Typography>
          <div style={{marginLeft: 'auto'}}>close</div>
        </div>
        <div>
        <TextField size="small" variant="outlined" />
        <Button sx={{ml:1}} variant='contained'>Add</Button>
        </div>
      </CardContent>
    </Card>
  );
};
