import { Button } from '@mui/material';
import React from 'react';
import { useAuthContext } from '../providers/AuthProvider';
import { useLinksContext } from '../providers/LinksProvider';

export const Settings: React.FC = () => {
  const auth = useAuthContext();
  const links = useLinksContext();
  const signOut = auth.signOut;
  return (
    <div style={{margin: '8px'}}>
    <Button sx={{mb:1}} onClick={signOut} fullWidth variant='outlined'>Upgrade Plan</Button>
    <Button sx={{mb:1}} onClick={() => {links.reset(); signOut()}} fullWidth variant='outlined'>Sign Out</Button>
    </div>
  )
}