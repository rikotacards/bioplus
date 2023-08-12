import { Button, CardContent, Typography, Card } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export const CreateUsernameNotice: React.FC = () => {
  const nav = useNavigate();
  return (
    <div style={{display: 'flex', flexDirection: 'column', margin: '8px'}}>
      <Button size='large' sx={{mb:1}} variant='contained' onClick={() => nav('/create-username')}>Create username</Button>
      <Card>
        <CardContent>
          <Typography>You must create a username before you can start adding links.</Typography>
        </CardContent>
      </Card>
      </div>
  )
}