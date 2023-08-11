import React from 'react';
import './Solid.css'
import { useUserThemeContext } from '../../providers/UserThemeProvider';
export const Solid: React.FC = () => {
  const userTheme = useUserThemeContext();
  return (
    <div style={{backgroundColor: userTheme.backgroundColor}} className='common-background solid' />
  )
}