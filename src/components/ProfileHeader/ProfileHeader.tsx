import React from 'react'
import {Avatar, Typography, Card, CardContent} from '@mui/material'
export const ProfileHeader: React.FC = () => {
  return (
    <Card sx={{mb:1}} >
      <CardContent style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>

      <Avatar sx={{height: '50px', width: '50px'}}/>
      <Typography>@maxwelldhsu</Typography>
      <Typography>This is my bio</Typography>
      </CardContent>
    </Card>
  )
}