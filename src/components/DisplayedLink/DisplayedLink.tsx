import React from "react";
import "../../configs/linkStyles.css";
import {
  CardActionArea,
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
  linkButtonClassName: string;
  linkButtonTransparency: string;
  linkButtonBackgroundColor: string;
  linkButtonTextAlignment: string;
}

export const DisplayedLink: React.FC<DisplayedLinkProps> = ({
  title,
  link,
  linkId,
  uid,
  linkButtonClassName,
  linkButtonTransparency,
  linkButtonBackgroundColor,
  linkButtonTextAlignment,
}) => {
  const url = prependHttp(link);
  const [thumbnailPath, setThumbnailPath] = React.useState("");
  React.useEffect(() => {
    const path = `${uid}/linkThumbnails/${linkId}.jpg`;
    getImagePath(path).then((res) => {
      setThumbnailPath(res);
    }).catch((e) => console.log(e))
  }, [uid, thumbnailPath]);
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
      style={{ marginBottom: "8px", marginLeft: "16px", marginRight: "16px" }}
    >
      <Paper
        sx={{ backgroundColor: linkButtonBackgroundColor }}
        className={clx([
          "display-link-common",
          linkButtonClassName,
          linkButtonTransparency,
        ])}
        elevation={3}
      >
        <CardActionArea>
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "8px",
              alignItems: "center",
            }}
          >
            {thumbnailPath && (
              <img
                src={thumbnailPath}
                className={clx([linkButtonClassName])}
                style={{
                  marginRight: "8px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  height: "70px",
                  width: "70px",
                  display: "flex",
                  flexShrink: 1,
                }}
              />
            )}
            <div
              className={clx([
                "display-link-common",
                linkButtonTextAlignment,
              ])}
              style={{ display: "block", width: "100%" }}
            >
              <Typography sx={{ fontWeight: "500" }} variant="body1">
                {title || url}
              </Typography>
            </div>
          </div>
        </CardActionArea>
      </Paper>
    </Box>
  );
};
