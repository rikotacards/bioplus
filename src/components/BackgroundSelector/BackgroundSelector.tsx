import { Button, Typography } from '@mui/material';
import React from 'react';
import '../../configs/backgrounds.css'
import { useUserThemeContext } from '../../providers/UserThemeProvider';
import { backgrounds } from '../../configs/backgrounds';
import clx from 'clsx';
//todo

interface BackgroundOptionsProps {
  style: { [key: string]: any },
  name: string;
}
const BackgroundOption: React.FC<BackgroundOptionsProps> = ({ style, name }) => {
  const userTheme = useUserThemeContext();
  const onClick = (styleName: string) => {
    userTheme.setBackgroundClassName(styleName)
  }
  return (
    <div onClick={() => onClick(name)} style={{cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '8px'}}>
      <div className={clx('common', name)} />
      <Typography>{name}</Typography>
    </div>
  )
}


export const BackgroundSelector: React.FC = () => {

  return (
    <div>
      <div>

        <Typography sx={{mb: 1,mt:1, fontWeight: 'bold' }} variant='h4'>Background</Typography>
      </div>
      <div style={{display: 'flex'}}>
        {
          backgrounds.map((b) => <BackgroundOption style={b.style} name={b.name} />)
        }
      </div>
    </div>
  )
}