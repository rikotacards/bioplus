import React from "react";
import "../../configs/linkStyles.css";
import { CardActionArea, Card, CardContent, Typography, Paper, Box } from "@mui/material";
import { prependHttp } from "../../util/prependHttp";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import { incrementLinkClick } from "../../db/api";
import clx from 'clsx';
import '../../configs/linkStyles.css'
interface DisplayedLinkProps {
  title: string;
  link: string;
  linkId: string;
  uid: string;
  onClick: () => void;
}

export const DisplayedLink: React.FC<DisplayedLinkProps> = ({
  title,
  link,
  linkId,
  uid,
}) => {
  const url = prependHttp(link);
  const userThemeContext = useUserThemeContext();
  return (
    <Box
      onClick={async () => {
        if (!uid) {
          return;
        }
        console.log("click");
        uid
          ? await incrementLinkClick({ uid, linkId }).then(() => {
              window.location.href = url;
            })
          : () => {};
      }}
      
      
      style={{ margin: "4px", marginLeft: '16px', marginRight: '16px' }}
      
    >
      <Paper 
      sx={{backgroundColor: userThemeContext.linkBackgroundColor}}
      className={
        clx(
          ['display-link-common',
          userThemeContext.buttonClassName,
          userThemeContext.buttonTextAlignment,
          userThemeContext.buttonTransparency,
        ]
        )
      }  elevation={3}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{fontWeight:'bold'}} variant="body1">{title}</Typography>
        </CardContent>
      </CardActionArea>
      </Paper>
    </Box>
  );
};
