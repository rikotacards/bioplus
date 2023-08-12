import React from "react";
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader";
import { DisplayedLink } from "../components/DisplayedLink/DisplayedLink";
import { Card, Drawer, IconButton, Skeleton, Typography } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { PublicProfileDrawerContent } from "../components/PublicProfileDrawerContent/PublicProfileDrawerContent";
interface ProfileProps {
  username?: string;
  uid?: string;
  profilePhotoUrl: string;
  bio?: string;
  isPreview?: boolean;
  linkButtonClassName: string;
  linkButtonTransparency: string;
  linkButtonBackgroundColor: string;
  linkButtonTextAlignment: string;
  backgroundComponent: React.ReactNode;
  links: {
    title: string;
    linkId: string;
    link: string;
    isDisplayed: boolean;
  }[];
}
export const Profile: React.FC<ProfileProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  const nav = useNavigate();
  return (
    <div
      id="container"
      style={{
        maxWidth: "500px",
        zIndex: 1000,
        height: "100%",
        width: "100%",
        position: "relative",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", display: "flex" }}>
        <div
          style={{
            border: "1px solid white",
            backdropFilter: "blur(20px)",
            marginLeft: "auto",
            marginRight: "8px",
            marginTop: "8px",
            borderRadius: "50%",
          }}
        >
          <IconButton color="inherit" onClick={toggle}>
            <MoreHorizIcon color="inherit" />
          </IconButton>
        </div>
      </div>
      <ProfileHeader
        bio={props.bio || ""}
        profilePhotoUrl={props.profilePhotoUrl}
        username={props.username}
      />
      {props.links.length === 0 && (
        <Skeleton
          sx={{ m: 0.5, borderRadius: "5px", height: "60px" }}
          variant="rectangular"
        />
      )}
      {props.links.map((link, index) => {
        if (link.isDisplayed) {
          return (
            <DisplayedLink
              key={link.title + index + link.link}
              title={link.title}
              link={link.link}
              linkId={link.linkId}
              uid={props.uid || ""}
              linkButtonClassName={props.linkButtonClassName}
              linkButtonTransparency={props.linkButtonTransparency}
              linkButtonBackgroundColor={props.linkButtonBackgroundColor}
              linkButtonTextAlignment={props.linkButtonTextAlignment}
            />
          );
        }
      })}
      {props.backgroundComponent}
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        {!props.isPreview && (
          <Card
            onClick={() => nav("/")}
            variant="outlined"
            style={{
              padding: "8px",
              borderRadius: "100px",
              margin: "8px",
              display: "flex",
              justifyContent: "center",
              bottom: 0,
              position: "absolute",
            }}
          >
            (
            <Typography color="GrayText" variant="caption">
              Powered by BioUp
            </Typography>
            )
          </Card>
        )}
      </div>
      <Drawer
        sx={{
          width: "100%",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          overflow: "hidden",
        }}
        hideBackdrop
        anchor="bottom"
        onClose={toggle}
        open={open}
      >
        <PublicProfileDrawerContent toggle={toggle} username={props.username} />
      </Drawer>
    </div>
  );
};
