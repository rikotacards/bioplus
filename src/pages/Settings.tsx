import { Button } from '@mui/material';
import React from 'react';
import { useAuthContext } from '../providers/AuthProvider';

export const Settings: React.FC = () => {
  const auth = useAuthContext();
  const signOut = auth.signOut;
  return (
    <div style={{margin: '8px'}}>
    <Button onClick={signOut} fullWidth variant='outlined'>Sign Out</Button>
    </div>
  )
}