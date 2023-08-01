import { Button, Typography } from '@mui/material';
import React from 'react';
import { useUserThemeContext } from '../../providers/UserThemeProvider';

//todo
const backgrounds = ['red', 'orange', 'blue']
export const BackgroundSelector: React.FC = () => {
  const userThemeContext = useUserThemeContext();
  const onClick = () => {
    userThemeContext.theme.palette.mode === 'dark' ? 
    userThemeContext.setLightMode() : userThemeContext.setDarkMode();
  }
  return (
    <div>
      <Typography sx={{fontWeight: 'bold'}} variant='h4'>Background</Typography>
      <div>
        {
          backgrounds.map((b) => <Button onClick={() => userThemeContext.setBackground(b)} sx={{mr:1}} variant='contained'>{b}</Button>)
        }
      </div>
      <Button variant='outlined' onClick={onClick}>Enable LightMode</Button>
    </div>
  )
}