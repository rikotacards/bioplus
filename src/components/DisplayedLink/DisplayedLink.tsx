import React from "react";
import {CardActionArea, Card, CardContent, Typography } from "@mui/material";
import { prependHttp } from "../../util/prependHttp";
interface DisplayedLinkProps {
  title: string;
  link: string;
  onClick?: () => void;
}
export const DisplayedLink: React.FC<DisplayedLinkProps> = ({title,link, onClick}) => {
  return (
    <a target="_blank" href={prependHttp(link)}>
      <Card onClick={() => {onClick?.()}} sx={{width: '100%', marginBottom: 1}}>
        <CardActionArea>
          <CardContent>
          <Typography variant='h6'>{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </a>
  );
};
