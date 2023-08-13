import React from "react";
import { Profile } from "../../pages/Profile";
export const PublicPreview: React.FC = () => {
  return (
    <div style={{display: 'flex', height: '100vh', flexDirection: 'column'}}>

    <Profile
      isPreview={true}
      bio={"A creator of all sorts"}
      uid={""}
      backgroundComponent={<></>}
      profilePhotoUrl={ ""}
      username={'Username'}
      links={[]}
      linkButtonClassName={'br-high'}
      linkButtonTransparency={'transparent'}
      linkButtonBackgroundColor={''}
      linkButtonTextAlignment={'center'}
    />
    </div>
  );
};
