import React from "react";
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader";
import { DisplayedLink } from "../components/DisplayedLink/DisplayedLink";
import { incrementLinkClick } from "../db/api";
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
export const Profile: React.FC<ProfileProps> = ({uid, profilePhotoUrl, links, username }) => {
  
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <ProfileHeader profilePhotoUrl={profilePhotoUrl} username={username} />
      {links.map((link,index) => {
        const onClick = uid ? () => incrementLinkClick({uid, linkId: link.linkId}): undefined;
        if (link.isDisplayed) {
          return <DisplayedLink onClick={onClick} key={link.title+index + link.link} title={link.title} link={link.link} />;
        }
      })}
    </div>
  );
};
