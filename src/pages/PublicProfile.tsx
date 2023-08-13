import React from "react";
import { Profile } from "./Profile";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, getUser, getUidFromUsername, getTheme } from "../db/api";
import { ThemeProperties } from "../providers/UserThemeProvider";
import { BackgroundMapping } from "../configs/backgroundMapping";
import { BackgroundName } from "../configs/backgrounds";
import { UserCustom } from "../providers/AuthProvider";

export type User = {
  bio?: string;
  uid: string;
  username?: string;
  photoURL?: string;
};
// public facing component, we use the window path name
export const PublicProfile: React.FC = () => {
  const location = useLocation();
  const usernameFromPath = location.pathname.split("/").join("");
  const nav = useNavigate();

  const [user, setUser] = React.useState<UserCustom>({} as UserCustom);
  const [theme, setTheme] = React.useState<ThemeProperties | undefined>();
  const [links, setLinks] = React.useState<Link[]>([]);
  const set = (links: Link[]) => {
    setLinks(links);
  };


  React.useEffect(() => {
    getUidFromUsername(usernameFromPath)
      .then((res) => {
        if (res?.uid) {
          const { uid } = res;
          getTheme({ uid }).then((res) => {
            if (!res) {
              return;
            }
            console.log(res.theme)
            setTheme(res.theme);
          });
          getUser({ uid }).then((res) => {
            if (!res) {
              nav("/no-content");
              return;
            }
            set((res.links as Link[]) || []);
            setUser(res);
          });
        } else {
          nav("/no-content");
        }
      })
      .catch((e) => {
        nav("/no-content");
        console.log(e);
      });
  }, []);

  if (!theme || !user.uid) {

    return <div></div>;
  }
  const backgroud = (
    <BackgroundMapping
      uid={user.uid || ""}
      backgroundComponentName={theme.backgroundClassName as BackgroundName || ""}
    />
  );
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {user && (
        <Profile
          isPreview={false}
          bio={user?.bio}
          uid={user?.uid}
          backgroundComponent={backgroud}
          profilePhotoUrl={user?.photoURL || ""}
          username={usernameFromPath}
          links={links}
          name={user?.name}
          linkButtonClassName={theme.buttonClassName}
          linkButtonTransparency={theme.buttonTransparency}
          linkButtonBackgroundColor={theme.linkBackgroundColor}
          linkButtonTextAlignment={theme.buttonTextAlignment}
        />
      )}
    </div>
  );
};
