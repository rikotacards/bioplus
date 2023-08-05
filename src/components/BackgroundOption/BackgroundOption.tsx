import React from 'react';
import { useUserThemeContext } from '../../providers/UserThemeProvider';
import { BackgroundName } from '../../configs/backgrounds';
import { backgroundMapping } from '../../configs/backgroundMapping';
import { Typography } from '@mui/material';
import './BackgroundOption.css'
interface BackgroundOptionsProps {
  name: BackgroundName;
}
export const BackgroundOption: React.FC<BackgroundOptionsProps> = ({ name }) => {
  const userTheme = useUserThemeContext();
  const [selected, setSelected] = React.useState(false);
  const onClick = (styleName: string) => {
    setSelected(!selected)
    userTheme.setBackgroundClassName(styleName)
  }
  const background = backgroundMapping[name];
  return (
    <div style={{border:selected ? '1px solid white': undefined, borderRadius: '10px'}}>

      <div className='background-option' onClick={() => onClick(name)} >
        {background}
      </div>
      <Typography>{name}</Typography>
    </div>

  )
}