import React from "react";
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader";
import { DisplayedLink } from "../components/DisplayedLink/DisplayedLink";
import { incrementLinkClick } from "../db/api";
import { useUserThemeContext } from "../providers/UserThemeProvider";
import { ThemeProvider } from "@emotion/react";
import { Paper, createTheme } from "@mui/material";
import '../configs/backgrounds.css'
interface ProfileProps {
  username?: string;
  uid?: string;
  profilePhotoUrl: string;
  links: {
    title: string;
    linkId: string;
    link: string;
    isDisplayed: boolean;
  }[];
}
export const Profile: React.FC<ProfileProps> = ({ uid, profilePhotoUrl, links, username }) => {
  const userThemeContext = useUserThemeContext();
  console.log(userThemeContext)
  const theme = createTheme(userThemeContext.theme)
  return (
    <ThemeProvider theme={theme}>
      <div className={userThemeContext.backgroundClassName} style={{ height: '100%', width: "100%", display: "flex", flexDirection: "column" }}>
        <ProfileHeader profilePhotoUrl={profilePhotoUrl} username={username} />
        {links.map((link, index) => {
          const onClick = uid ? () => incrementLinkClick({ uid, linkId: link.linkId }) : undefined;
          if (link.isDisplayed) {
            return <DisplayedLink onClick={onClick} key={link.title + index + link.link} title={link.title} link={link.link} />;
          }
        })}
      </div>
    </ThemeProvider>
  );
};
