import React from "react";
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader";
import { DisplayedLink } from "../components/DisplayedLink/DisplayedLink";
import { incrementLinkClick } from "../db/api";
import { useUserThemeContext } from "../providers/UserThemeProvider";
import { ThemeProvider } from "@emotion/react";
import {  createTheme } from "@mui/material";
import { backgroundMapping } from "../configs/backgroundMapping";
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
  const backgroud = backgroundMapping[userThemeContext.backgroundClassName]
  return (
    <ThemeProvider theme={theme}>
      <div id='container' style={{ maxWidth: '500px', zIndex: 1000, height: '100%', width: "100%", position: 'relative', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
        <ProfileHeader profilePhotoUrl={profilePhotoUrl} username={username} />
        {links.map((link, index) => {
          const onClick = uid ? () => incrementLinkClick({ uid, linkId: link.linkId }) : undefined;
          if (link.isDisplayed) {
            return <DisplayedLink onClick={onClick} key={link.title + index + link.link} title={link.title} link={link.link} />;
          }
        })}
        {backgroud}

      </div>
    </ThemeProvider>
  );
};
