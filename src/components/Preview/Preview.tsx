import React from 'react';
import { Profile } from '../../pages/Profile';
import { useLinksContext } from '../../providers/LinksProvider';
import { UserCustom, useAuthContext } from '../../providers/AuthProvider';
import { useUserThemeContext } from '../../providers/UserThemeProvider';
import { BackgroundMapping } from '../../configs/backgroundMapping';
import { getUser } from '../../db/api';

export const Preview: React.FC = () => {
  const linksContext = useLinksContext();
  const auth = useAuthContext();
  const theme = useUserThemeContext();
  const uid = auth?.user?.uid;
  const [user, setUser] = React.useState<UserCustom | undefined>()
 
  React.useEffect(() => {
    if(!uid){return;}
    getUser({uid}).then((res) => {
      if(!res){
        return;
      }
      setUser(res);
    })
  },[uid])
  if(!user){
    return <></>
  }
  const background = (
    <BackgroundMapping
      uid={uid || ""}
      backgroundComponentName={theme.backgroundClassName as BackgroundName || ""}
    />
  );
  return (
    <div style={{ height: '100vh', display: 'flex'}}>
      <Profile 
      isPreview={true}
      bio={user.bio}
      uid={user.uid}
      name={user.name}
      backgroundComponent={background}
      profilePhotoUrl={user?.photoURL || ""}
      username={user.username}
      linkButtonClassName={theme.buttonClassName}
      linkButtonTransparency={theme.buttonTransparency}
      linkButtonBackgroundColor={theme.linkBackgroundColor}
      linkButtonTextAlignment={theme.buttonTextAlignment}
      links={linksContext.links || []}/>
    </div>
  )
}