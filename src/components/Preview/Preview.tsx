import React from 'react';
import { Profile } from '../../pages/Profile';
import { useLinksContext } from '../../providers/LinksProvider';
import { useAuthContext } from '../../providers/AuthProvider';
import {  getUser } from '../../db/api';

export const Preview: React.FC = () => {
  const linksContext = useLinksContext();
  const auth = useAuthContext();
  const uid = auth?.user?.uid;
  const [user, setUser] = React.useState({})
  React.useEffect(() => {
   uid && getUser({uid}).then((res) => {
    setUser(res)
   })
  },[uid])
  return (
    <div style={{ height: '100vh', display: 'flex'}}>
      <Profile isPreview={true} uid={uid} bio={user?.bio} profilePhotoUrl={user?.photoUrl}username={user?.username} links={linksContext.links || []}/>
    </div>
  )
}