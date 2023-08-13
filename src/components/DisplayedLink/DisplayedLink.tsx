import React from "react";
import "../../configs/linkStyles.css";
import { CardActionArea, Typography, Paper, Box } from "@mui/material";
import { prependHttp } from "../../util/prependHttp";
import { useUserThemeContext } from "../../providers/UserThemeProvider";
import { getImagePath, incrementLinkClick } from "../../db/api";
import clx from "clsx";
import "../../configs/linkStyles.css";
import { MoreHorizOutlined } from "@mui/icons-material";
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
    getImagePath(path)
      .then((res) => {
        setThumbnailPath(res);
      })
      .catch((e) => console.log(e));
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
        <CardActionArea
          sx={{
            display: "flex",
            width: "100%",
            padding: "8px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              width: "20%",
            }}
          >
            {thumbnailPath && (
              <img
                src={thumbnailPath}
                className={clx([linkButtonClassName])}
                style={{
                  marginRight: "8px",
                  objectFit: "cover",
                  height: "70px",
                  width: "70px",
                }}
              />
            )}
          </div>
          <div
            className={clx(["display-link-common"])}
            style={{width: "100%", flexShrink: 1, display: "flex"}}
          >
            <div
            className='center'
            style={{width:'100%'}}>

            <Typography sx={{ fontWeight: "600" }} variant="body2">
              {title || url}
            </Typography>
            </div>
          </div>
          <div
            style={{
              width: "20%",
              justifyContent: "flex-end",
              display: "flex",
              flexGrow: 1,
              
            }}
          >
            <MoreHorizOutlined />
          </div>
        </CardActionArea>
      </Paper>
    </Box>
  );
};
