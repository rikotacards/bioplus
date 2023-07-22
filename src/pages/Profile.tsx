import React from "react";
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader";
import { DisplayedLink } from "../components/DisplayedLink/DisplayedLink";
interface ProfileProps {
  username?: string;
  links: {
    title: string;
    linkId: string;
    link: string;
    isDisplayed: boolean;
  }[];
}
export const Profile: React.FC<ProfileProps> = ({ links, username }) => {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <ProfileHeader username={username} />
      {links.map((link) => {
        if (link.isDisplayed) {
          return <DisplayedLink title={link.title} link={link.link} />;
        }
      })}
    </div>
  );
};
