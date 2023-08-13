import React from 'react';
import './Gradient.css';
import './common.css';
import { useUserThemeContext } from '../../providers/UserThemeProvider';
export const Gradient: React.FC = () => {
  const userTheme = useUserThemeContext();
  const gradient = `linearGradient(to top, rgba(255, 192, 203, 0.5), rgba(255, 192, 203, 0))`
  return (<div className={'common-background'} style={{  background: `linear-gradient(to top, ${userTheme?.backgroundColor || 'gray'}, rgba(0, 0, 0, 0))`,
}}/>)
}