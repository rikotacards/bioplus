import React from 'react';
import { Profile } from '../../pages/Profile';
import { useLinksContext } from '../../providers/LinksProvider';
import { useAuthContext } from '../../providers/AuthProvider';
import {  getUsernameFromUsers } from '../../db/api';

export const Preview: React.FC = () => {
  const linksContext = useLinksContext();
  const auth = useAuthContext();
  const uid = auth?.user?.uid;
  const [username, setUsername] = React.useState('');
  React.useEffect(() => {
    uid && getUsernameFromUsers({uid}).then((res) => {
      setUsername(res)
    })
  })
  return (
    <div style={{ height: '100vh', display: 'flex'}}>
      <Profile profilePhotoUrl='' username={username} links={linksContext.links || []}/>
    </div>
  )
}