import React from "react";
import { Profile } from "./Profile";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, getPublicProfileLinks, getTheme, getUsernameDetails } from "../db/api";
import { useUserThemeContext } from "../providers/UserThemeProvider";
import { CircularProgress, LinearProgress, Skeleton } from "@mui/material";
import { useLoadingContext } from "../providers/LoadingProvider";

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
  
  const username = location.pathname.split("/").join("");
  React.useEffect(() => {
    getUsernameDetails(username).then((res) => {
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
        bio={user?.bio}
        uid={user?.uid}
        profilePhotoUrl={user?.photoUrl || ""}
        username={username}
        links={links}
      />}
    </div>
  );
};
