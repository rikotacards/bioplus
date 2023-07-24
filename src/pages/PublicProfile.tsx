import React from "react";
import { Profile } from "./Profile";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, getPublicProfileLinks, getUsernameDetails } from "../db/api";
import { User } from "firebase/auth";

export const PublicProfile: React.FC = () => {
  const location = useLocation();
  const nav = useNavigate();
  console.log("localtion", location);
  const [user, setUser] = React.useState({} as {uid: string, photoUrl: string})
  const [links, setLinks] = React.useState<Link[]>([]);
  const set = (links: Link[]) => {
    setLinks(links);
  };
  const username = location.pathname.split("/").join("");
  React.useEffect(() => {
    getUsernameDetails(username).then((res) => {
      console.log(res);
      if (res?.uid) {
        console.log(res)
        getPublicProfileLinks(res.uid).then((res) => {
          set((res?.links as Link[]) || []);
          setUser(res as any)
        });
      } else {
        nav('/no-content')
      }
    });
  }, []);

  return (
    <div style={{ paddingTop: "10px" }}>
      <Profile uid={user?.uid} profilePhotoUrl={user?.photoUrl || ""} username={username} links={links} />
    </div>
  );
};
