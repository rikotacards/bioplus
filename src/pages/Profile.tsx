import React from "react";
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader";
import { DisplayedLink } from "../components/DisplayedLink/DisplayedLink";
import { Box, Chip, Drawer, IconButton, Skeleton, Typography } from "@mui/material";
import "../pages/Landing.css";
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
  name?: string;
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
    console.log("toggle");
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
            marginLeft: "auto",
            marginRight: "8px",
            marginTop: "16px",
          }}
        >
          <Chip
            sx={{
              display: "flex",
              alignItems: "center",
              backdropFilter: "blur(5px)",
            }}
            size="small"
            onClick={toggle}
            label={
              <IconButton size="small">
                <MoreHorizIcon />
              </IconButton>
            }
          />
        </div>
      </div>
      <ProfileHeader
        name={props.name}
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
          <Box
          onClick={() => nav('/')}
            sx={{
              border: "1px solid white",
              margin: "8px",
              display: "flex",
              justifyContent: "center",
              bottom: "12%",
              position: "absolute",
              borderRadius: "50px",
              padding: "8px",
              backdropFilter: "blur(20px)",
            }}
          >
            <Typography variant="body2">Get your BioUp</Typography>
          </Box>
        )}
      </div>
      <Drawer
        // hideBackdrop
        anchor="bottom"
        onClose={toggle}
        open={open}
        sx={{ zIndex: "3000" }}
      >
        <PublicProfileDrawerContent toggle={toggle} username={props.username} />
      </Drawer>
    </div>
  );
};
