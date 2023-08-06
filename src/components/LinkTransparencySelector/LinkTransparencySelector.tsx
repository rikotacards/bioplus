import {   Switch, Typography } from '@mui/material';
import React from 'react';
import {  backgrounds } from '../../configs/backgrounds';
import { BackgroundOption } from '../BackgroundOption/BackgroundOption';
import { useUserThemeContext } from '../../providers/UserThemeProvider';



export const LinkTransparencySelector: React.FC = () => {
  const [isOn, setOn] = React.useState(false)
  const userTheme = useUserThemeContext();
  const onClick =() => {
    setOn(!isOn)
    userTheme.setButtonTransparency(isOn? '' : 'transparency-on')
  }
  return (
    <div >
      <div>

        <Typography sx={{mb: 1,mt:1, fontWeight: 'bold' }} variant='h4'>Link Transparency</Typography>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
        <Switch checked={isOn} onChange={onClick}/>
      </div>
    </div>
  )
}