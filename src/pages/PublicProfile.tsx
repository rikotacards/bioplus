import React from "react";
import { Profile } from "./Profile";
import { useLocation } from "react-router-dom";
import { Link, getPublicProfileLinks, getUsernameDetails } from "../db/api";

export const PublicProfile: React.FC = () => {
  const location = useLocation();
  console.log("localtion", location);

  const [links, setLinks] = React.useState<Link[]>([]);
  const set = (links: Link[]) => {
    setLinks(links);
  };
  React.useEffect(() => {
    const username = location.pathname.split("/").join("");
    getUsernameDetails(username).then((res) => {
      console.log(res);
      if (res?.uid) {
        getPublicProfileLinks(res.uid).then((res) => {
          console.log(res);
          set((res?.links as Link[]) || []);
        });
      } else {
        return <>no Page</>;
      }
    });
  }, []);

  return (
    <div style={{ paddingTop: "20px" }}>
      <Profile links={links} />
    </div>
  );
};
