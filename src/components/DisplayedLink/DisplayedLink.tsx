import React from "react";
import {CardActionArea, Card, CardContent, Typography } from "@mui/material";
import { prependHttp } from "../../util/prependHttp";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
interface DisplayedLinkProps {
  title: string;
  link: string;
  onClick?: () => void;
}
export const DisplayedLink: React.FC<DisplayedLinkProps> = ({title,link, onClick}) => {
  const userThemeContext = useUserThemeContext();
  console.log('sp', userThemeContext.theme.borderRadius)
  return (
    <a target="_blank" href={prependHttp(link)}>
      <Card onClick={() => {onClick?.()}} sx={{width: '100%', marginBottom: 1, borderRadius: userThemeContext.theme.borderRadius}}>
        <CardActionArea>
          <CardContent>
          <Typography variant='h6'>{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </a>
  );
};
