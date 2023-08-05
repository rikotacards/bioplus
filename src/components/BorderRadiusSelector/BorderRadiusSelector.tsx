import {  Typography } from '@mui/material';
import React from 'react';
import { useUserThemeContext } from '../../providers/UserThemeProvider';
import '../../configs/linkStyles.css'
//todo
const filled = ['', 'br-medium', 'br-high']
export const BorderRadiusSelector: React.FC = () => {
  const userThemeContext = useUserThemeContext();
  
  return (
    <div>
        <Typography sx={{mb: 1,mt:1, fontWeight: 'bold' }} variant='h4'>Link Style</Typography>
      <div>
        {
          filled.map((b) => <div className={'filled common-link ' + b} onClick={() => userThemeContext.setButtonClassName(b)} />)
        }
      </div>
    </div>
  )
}