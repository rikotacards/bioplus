import React from 'react';
import { Profile } from '../../pages/Profile';
import { useLinksContext } from '../../providers/LinksProvider';
import { useAuthContext } from '../../providers/AuthProvider';
import { getUsername, getUsernameFromUsers } from '../../db/api';

export const Preview: React.FC = () => {
  const linksContext = useLinksContext();
  console.log(linksContext)
  const auth = useAuthContext();
  const uid = auth?.user?.uid;
  const [username, setUsername] = React.useState('');
  React.useEffect(() => {
    uid && getUsernameFromUsers({uid}).then((res) => {
      console.log('res', res)
      setUsername(res)
    })
  })
  return (
    <div style={{padding: '10px', height: '100vh'}}>
      <Profile profilePhotoUrl='' username={username} links={linksContext.links || []}/>
    </div>
  )
}