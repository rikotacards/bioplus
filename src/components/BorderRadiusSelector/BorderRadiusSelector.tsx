import { Button, Typography } from '@mui/material';
import React from 'react';
import { useUserThemeContext } from '../../providers/UserThemeProvider';

//todo
const borderRadius = ['10px', '30px', '100px']
export const BorderRadiusSelector: React.FC = () => {
  const userThemeContext = useUserThemeContext();
  
  return (
    <div>
      <Typography sx={{fontWeight: 'bold', mt: 1, mb:1 }} variant='h4'>Link Style</Typography>
      <div>
        {
          borderRadius.map((b) => <Button onClick={() => userThemeContext.setBorderRadius(b)} sx={{mr:1}} variant='contained'>{b}</Button>)
        }
      </div>
    </div>
  )
}