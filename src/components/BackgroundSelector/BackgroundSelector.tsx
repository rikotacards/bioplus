import {   Typography } from '@mui/material';
import React from 'react';
import {  backgrounds } from '../../configs/backgrounds';
import { BackgroundOption } from '../BackgroundOption/BackgroundOption';



export const BackgroundSelector: React.FC = () => {
  const [selected, setSelected] = React.useState('')
  const onClick =(name: string) => {
    setSelected(name)
  }
  return (
    <div >
      <div>

        <Typography sx={{mb: 1,mt:1, fontWeight: 'bold' }} variant='h4'>Background</Typography>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {
          backgrounds.map((b) => <div key={b.name} onClick={() => {onClick(b.name)}}><BackgroundOption isSelected={b.name === selected} name={b.name} /></div>)
        }
      </div>
    </div>
  )
}