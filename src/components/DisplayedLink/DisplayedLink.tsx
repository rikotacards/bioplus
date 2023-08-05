import React from "react";
import '../../configs/linkStyles.css'
import { CardActionArea, Card, CardContent, Typography } from "@mui/material";
import { prependHttp } from "../../util/prependHttp";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import { linkStyles } from "../../configs/linkStyles";
interface DisplayedLinkProps {
  title: string;
  link: string;
  onClick?: () => void;
}
export const DisplayedLink: React.FC<DisplayedLinkProps> = ({ title, link, onClick }) => {
  const userThemeContext = useUserThemeContext();
  return (
    <a style={{ margin: '4px' }} href={prependHttp(link)} >
      <Card sx={linkStyles[userThemeContext.buttonClassName]} onClick={() => { onClick?.() }} >
        <CardActionArea>
          <CardContent>
            <Typography variant='body1'>{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  );
};
