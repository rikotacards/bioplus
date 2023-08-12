import React from "react";
import "../../configs/linkStyles.css";
import {
  CardActionArea,
  CardContent,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { prependHttp } from "../../util/prependHttp";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import { getImagePath, incrementLinkClick } from "../../db/api";
import clx from "clsx";
import "../../configs/linkStyles.css";
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
  const [thumbnailPath, setThumbnailPath] = React.useState("");
  React.useEffect(() => {
    const path = `${uid}/linkThumbnails/${linkId}.jpg`;
    getImagePath(path).then((res) => {
      setThumbnailPath(res);
    });
  },[uid, thumbnailPath]);
  const userThemeContext = useUserThemeContext();
  return (
    <Box
      onClick={async () => {
        if (!uid) {
          return;
        }
        uid
          ? await incrementLinkClick({ uid, linkId }).then(() => {
              window.location.href = url;
            })
          : () => {};
      }}
      style={{marginBottom: '8px',  marginLeft: "16px", marginRight: "16px" }}
    >
      <Paper
        sx={{ backgroundColor: userThemeContext.linkBackgroundColor }}
        className={clx([
          "display-link-common",
          userThemeContext.buttonClassName,
          userThemeContext.buttonTextAlignment,
          userThemeContext.buttonTransparency,
        ])}
        elevation={3}
      >
        <CardActionArea>
          <CardContent sx={{ padding: '8px', display: 'flex', alignItems: 'center'}}>
            {thumbnailPath && (
              <img
                src={thumbnailPath}
                style={{marginRight: '8px', borderRadius: '10px', objectFit: "cover", height: "80px", width: "80px" }}
              />
            )}
            <Typography sx={{ fontWeight: "600" }} variant="body1">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Paper>
    </Box>
  );
};
