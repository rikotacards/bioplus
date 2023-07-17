import React from 'react';
import { ProfileHeader } from '../components/ProfileHeader/ProfileHeader';
import { ProfileLinks } from '../components/ProfileLinks/ProfileLinks';

export const Profile: React.FC = () => {
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
      <ProfileHeader/>
      <ProfileLinks/>
    </div>
  )
}