import React from "react";
import {CardActionArea, Card, CardContent, Typography } from "@mui/material";
interface DisplayedLinkProps {
  title: string;
  link: string;
}
export const DisplayedLink: React.FC<DisplayedLinkProps> = ({title,link}) => {
  return (
      <Card sx={{width: '100%', marginBottom: 1}}>
        <CardActionArea>
        <CardContent><Typography>{title}</Typography></CardContent>
        </CardActionArea>
      </Card>
  );
};
