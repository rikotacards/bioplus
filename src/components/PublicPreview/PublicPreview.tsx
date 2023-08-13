import React from "react";
import { Profile } from "../../pages/Profile";
import { Sunset } from "../Backgrounds/Sunset";
import { CustomBackgroundImage } from "../CustomBackgroundImage/CustomBackgroundImage";
import { CustomImage } from "../Backgrounds/CustomImage";

const sampleLinks = [
  {
    title: "Merch store",
    linkId: 0,
    link: "www.merchstore.com",
    isDisplayed: true,
  },
  {
    title: "Performance clips",
    linkId: 1,
    link: "www.perf.com",
    isDisplayed: true,
  },
  {
    title: "Make an appointment!",
    linkId: 2,
    link: "www.perf.com",
    isDisplayed: true,
  },
  {
    title: "My books",
    linkId: 3,
    link: "www.perf.com",
    isDisplayed: true,
  },
  {
    title: "New release on spotify",
    linkId: 3,
    link: "www.perf.com",
    isDisplayed: true,
  },
];
export const PublicPreview: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Profile
        isPreview={true}
        bio={"A creator of all sorts"}
        uid={""}
        backgroundComponent={<CustomImage passedInUid=""/>}
        profilePhotoUrl={"https://firebasestorage.googleapis.com/v0/b/bioplus-5d3d2.appspot.com/o/Screenshot%202023-08-13%20at%203.24.44%20PM.png?alt=media&token=f94c9457-8682-4230-b388-f92cac31cc56"}
        username={"Tom"}
        links={sampleLinks}
        linkButtonClassName={"br-high"}
        linkButtonTransparency={"transparent"}
        linkButtonBackgroundColor={""}
        linkButtonTextAlignment={"center"}
      />
    </div>
  );
};
