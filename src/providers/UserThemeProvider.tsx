import { ThemeProvider } from '@emotion/react';
import { Theme, ThemeOptions, createTheme } from '@mui/material';
import { create } from '@mui/material/styles/createTransitions';
import React from 'react';
import { userDefaultTheme } from '../configs/userDefaultTheme';
interface UserThemeContextProps {
  theme: Theme;
  updateTheme: (args: {
    [key: string]: any;
  }) => void
}
const UserThemeContext = React.createContext({} as UserThemeContextProps)
export const useUserThemeContext = () => React.useContext(UserThemeContext);

interface UserThemeProviderProps {
  children: React.ReactNode;
}


export const UserThemeProvider: React.FC<UserThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = React.useState<ThemeOptions>(userDefaultTheme)

  console.log(theme)
  const setDarkMode = () => setTheme((t) => ({...t, palette: {...t.palette, mode: 'dark'}}))
  const setLightMode = () => setTheme((t) => ({...t, palette: {...t.palette, mode: 'light'}}))
  const setBackground = (color: string) => setTheme((t) => ({...t, palette: {...t.palette, background: {...t.palette?.background, paper: color}}}))
  const setBorderRadius = (borderRadius: number) => {
    setTheme((t) => ({...t, borderRadius}))
  }
  const updateTheme = () => {
    setTheme((t) => ({...t, }))
  }

  const context = {
    theme,
    updateTheme,
    setDarkMode,
    setLightMode,
    setBackground,
    setBorderRadius,
  }


  return (
    <UserThemeContext.Provider value={context}>
      {children}
    </UserThemeContext.Provider>
  )
}