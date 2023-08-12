import React from "react";
import { Profile } from "./Profile";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, getUser, getUidFromUsername } from "../db/api";

export type User = {
  bio?: string;
  uid: string;
  username?: string;
  photoUrl?: string;
}

export const PublicProfile: React.FC = () => {
  const location = useLocation();
  const usernameFromPath = location.pathname.split("/").join("");
  const nav = useNavigate();

  const [user, setUser] = React.useState<User>(
    {} as User
  );

  const [links, setLinks] = React.useState<Link[]>([]);
  const set = (links: Link[]) => {
    setLinks(links);
  };
  
  React.useEffect(() => {
    getUidFromUsername(usernameFromPath).then((res) => {
      if (res?.uid) {
        const {uid} = res;
        getUser({uid}).then((res) => {
          set((res?.links as Link[]) || []);
          setUser(res)
        });
      } else {
        nav("/no-content");
      }
    }).catch((e) => {
      nav("/no-content");
      console.log(e)
    })
  }, []);
 

  return (
    <div style={{  height: "100vh", width: '100%' }}>
      {user && <Profile
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
