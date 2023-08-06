import { ThemeOptions } from '@mui/material';
import React from 'react';
import { userDefaultTheme } from '../configs/userDefaultTheme';
interface UserThemeContextProps extends CustomStyles {
  theme: ThemeOptions;
  setDarkMode: () => void;
  setLightMode: () => void;
  buttonClassName: string;
  backgroundClassName: string;
  customBackgroundImageSrc: string;
  setCustomBackgroundImageSrc: (src: string) => void;

  setBackgroundClassName: (className: string) => void;
  setButtonClassName: (className: string) => void;
  setButtonTextAlignment: (className: string) => void;
  setButtonTransparency:(className: string) => void;

  updateTheme: (args: {
    [key: string]: any;
  }) => void
}
const UserThemeContext = React.createContext({buttonClassName: 'left'} as UserThemeContextProps)
export const useUserThemeContext = () => React.useContext(UserThemeContext);

interface UserThemeProviderProps {
  children: React.ReactNode;
}
interface CustomStyles {
  backgroundClassName: string;
  buttonTextAlignment: string;
  buttonTransparency: string;
  customBackgroundImageSrc: string;
}

export const UserThemeProvider: React.FC<UserThemeProviderProps & CustomStyles> = ({ children }) => {
  const [theme, setTheme] = React.useState<UserThemeContextProps>({} as UserThemeContextProps)

  const setDarkMode = () => setTheme((t) => ({...t, theme: {...theme, palette: {mode: 'dark'}}}))
  const setLightMode = () => setTheme((t) => ({...t, theme: {...theme, palette: { mode: 'light'}}}))
  const setButtonClassName = (className: string) => {
    setTheme((t) => ({...t, buttonClassName: className}))
  }
  const setCustomBackgroundImageSrc = (src: string) => {
    setTheme((t) => ({...t, customBackgroundImageSrc: src}))
  }
  const setBackgroundClassName = (className: string) => {
    setTheme((t) => ({...t, backgroundClassName: className}))
  }
  const setButtonTextAlignment = (className: string) => {
    setTheme((t) => ({...t, buttonTextAlignment: className}))
  }
  const setButtonTransparency = (className: string) => {
    setTheme((t) => ({...t, buttonTransparency: className}))
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
    setButtonTextAlignment,
    setButtonTransparency,
    setCustomBackgroundImageSrc,
    customBackgroundImageSrc: theme.customBackgroundImageSrc,
    backgroundClassName: theme.backgroundClassName,
    buttonClassName: theme.buttonClassName,
    buttonTextAlignment: theme.buttonTextAlignment,
    buttonTransparency: theme.buttonTransparency
  }


  return (
    <UserThemeContext.Provider value={context}>
      {children}
    </UserThemeContext.Provider>
  )
}