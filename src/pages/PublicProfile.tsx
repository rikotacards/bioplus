import React from "react";
import { Profile } from "./Profile";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, getPublicProfileLinks, getUsernameDetails } from "../db/api";

export const PublicProfile: React.FC = () => {
  const location = useLocation();
  const nav = useNavigate();

  const [user, setUser] = React.useState(
    {} as { uid: string; photoUrl: string }
  );

  const [links, setLinks] = React.useState<Link[]>([]);
  const set = (links: Link[]) => {
    setLinks(links);
  };
  
  const usernameFromPath = location.pathname.split("/").join("");
  React.useEffect(() => {
    getUsernameDetails(usernameFromPath).then((res) => {
      if (res?.uid) {
       
        getPublicProfileLinks(res.uid).then((res) => {
          set((res?.links as Link[]) || []);
          setUser(res as any);
        });
      } else {
        nav("/no-content");
      }
    });
  }, []);
 

  return (
    <div style={{  height: "100vh", width: '100%' }}>
      {user&& <Profile
        isPreview={false}
        bio={user?.bio}
        uid={user?.uid}
        profilePhotoUrl={user?.photoUrl || ""}
        username={usernameFromPath}
        links={links}
      />}
    </div>
  );
};
