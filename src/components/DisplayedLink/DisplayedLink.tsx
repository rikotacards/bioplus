import React from "react";
import {CardActionArea, Card, CardContent, Typography } from "@mui/material";
export const DisplayedLink: React.FC = () => {
  return (
    <>
      <Card sx={{width: '100%', marginBottom: 1}}>
        <CardActionArea>

        <CardContent><Typography>Link 1</Typography></CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
