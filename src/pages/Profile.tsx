import React from "react";
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader";
import { DisplayedLink } from "../components/DisplayedLink/DisplayedLink";
import { useUserThemeContext } from "../providers/UserThemeProvider";
import { ThemeProvider } from "@emotion/react";
import {
  Card,
  IconButton,
  Skeleton,
  Typography,
  createTheme,
} from "@mui/material";
import {
  BackgroundMapping,
} from "../configs/backgroundMapping";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { useDrawerContext } from "../providers/DrawerProvider";
interface ProfileProps {
  username?: string;
  uid?: string;
  profilePhotoUrl: string;
  bio?: string;
  isPreview?: boolean;

  links: {
    title: string;
    linkId: string;
    link: string;
    isDisplayed: boolean;
  }[];
}
export const Profile: React.FC<ProfileProps> = ({
  uid,
  bio,
  profilePhotoUrl,
  links,
  username,
  isPreview,
}) => {
  const userThemeContext = useUserThemeContext();
  const theme = createTheme(userThemeContext.theme);
  const drawerContext = useDrawerContext();
  React.useEffect(() => {
    if(isPreview){
      return;
    }
    drawerContext.setComponent("more");
    drawerContext.setComponentData({ username });
  }, []);
  const onMoreClick = drawerContext.onToggle;
  const backgroud = (
    <BackgroundMapping
      uid={uid}
      backgroundComponentName={userThemeContext.backgroundClassName}
    />
  );
  const nav = useNavigate();
  return (
    <ThemeProvider theme={theme}>
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
          <div style={{ border: '1px solid white', backdropFilter:'blur(8px)', marginLeft:'auto', marginRight: '8px', marginTop: '8px', borderRadius: "50%" }}>
            <IconButton
              color="primary"
              onClick={onMoreClick}
            >
              <MoreHorizIcon />
            </IconButton>
          </div>
        </div>
        <ProfileHeader
          bio={bio}
          profilePhotoUrl={profilePhotoUrl}
          username={username}
        />
        {links.length === 0 && (
          <Skeleton
            sx={{ m: 0.5, borderRadius: "5px", height: "60px" }}
            variant="rectangular"
          />
        )}
        {links.map((link, index) => {
          if (link.isDisplayed) {
            return (
              <DisplayedLink
                key={link.title + index + link.link}
                title={link.title}
                link={link.link}
                linkId={link.linkId}
                uid={uid}
              />
            );
          }
        })}
        {backgroud}
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
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
            <Typography color="GrayText" variant="caption">
              Powered by BioUp
            </Typography>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};
