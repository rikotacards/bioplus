import { ThemeOptions } from '@mui/material';
import React from 'react';
import { userDefaultTheme } from '../configs/userDefaultTheme';
interface UserThemeContextProps extends CustomStyles {
  theme: ThemeOptions;
  setDarkMode: () => void;
  setLightMode: () => void;
  buttonClassName: string;
  backgroundClassName: string;
  setBackgroundClassName: (className: string) => void;
  setButtonClassName: (className: string) => void;
  updateTheme: (args: {
    [key: string]: any;
  }) => void
}
const UserThemeContext = React.createContext({} as UserThemeContextProps)
export const useUserThemeContext = () => React.useContext(UserThemeContext);

interface UserThemeProviderProps {
  children: React.ReactNode;
}
interface CustomStyles {
  backgroundClassName: string
}

export const UserThemeProvider: React.FC<UserThemeProviderProps & CustomStyles> = ({ children }) => {
  const [theme, setTheme] = React.useState<UserThemeContextProps>({} as UserThemeContextProps)

  console.log(theme)
  const setDarkMode = () => setTheme((t) => ({...t, theme: {...theme, palette: {mode: 'dark'}}}))
  const setLightMode = () => setTheme((t) => ({...t, theme: {...theme, palette: { mode: 'light'}}}))
  const setButtonClassName = (className: string) => {
    setTheme((t) => ({...t, buttonClassName: className}))
  }
  const setBackgroundClassName = (className: string) => {
    setTheme((t) => ({...t, backgroundClassName: className}))
  }
  const updateTheme = () => {
    setTheme((t) => ({...t, }))
  }

  const context = {
    theme: userDefaultTheme,
    updateTheme,
    setDarkMode,
    setLightMode,
    setButtonClassName,
    setBackgroundClassName,
    backgroundClassName: theme.backgroundClassName,
    buttonClassName: theme.buttonClassName
  }


  return (
    <UserThemeContext.Provider value={context}>
      {children}
    </UserThemeContext.Provider>
  )
}