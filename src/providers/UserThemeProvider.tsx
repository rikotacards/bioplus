import { ThemeOptions } from "@mui/material";
import React from "react";
import { userDefaultTheme } from "../configs/userDefaultTheme";
import { useAuthContext } from "./AuthProvider";
import { UserTheme, getTheme, getUidFromUsername, updateUserTheme } from "../db/api";
import { useLocation } from "react-router-dom";
interface UserThemeContextProps extends ThemeProperties {
  theme: ThemeOptions;
  setDarkMode: () => void;
  setLightMode: () => void;
  buttonClassName: string;
  backgroundClassName: string;
  customBackgroundImageSrc: string;
  setCustomBackgroundImageSrc: (src: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  linkBackgroundColor: string;
  setLinkBackgroundColor: (color: string) => void;
  setBackgroundClassName: (className: string) => void;
  setButtonClassName: (className: string) => void;
  setButtonTextAlignment: (className: string) => void;
  setButtonTransparency: (className: string) => void;
  updateTheme: (args: { [key: string]: any }) => void;
}

const defaultTheme = {
  buttonClassName: "",
  customBackgroundImageSrc: "",
  buttonTextAlignment: "left",
  buttonTransparency: "",
  linkBackgroundColor: "",
  backgroundColor: "rgb(128,128,128)",
  backgroundClassName: ""
};

const UserThemeContext = React.createContext({} as UserThemeContextProps);
export const useUserThemeContext = () => React.useContext(UserThemeContext);

interface UserThemeProviderProps {
  children: React.ReactNode;
}
export interface ThemeProperties {
  buttonClassName: string;
  backgroundClassName: string;
  buttonTextAlignment: string;
  buttonTransparency: string;
  customBackgroundImageSrc: string;
  backgroundColor: string;
  linkBackgroundColor: string;
}

export const UserThemeProvider: React.FC<
  UserThemeProviderProps & ThemeProperties
> = ({ children }) => {
  const [theme, setTheme] = React.useState<ThemeProperties>(
    defaultTheme as UserThemeContextProps
  );
  const auth = useAuthContext();
  const location = useLocation();
  const isPrivate = location.pathname === "/appearance";
  const usernameFromPath = location.pathname.split("/").join("");
  const uid = auth?.user?.uid;
  const save = (arg: { [key: string]: string }) => {
    if (!uid) {
      return;
    }
    isPrivate &&
      updateUserTheme({
        uid,
        theme: arg as UserTheme,
      });
  };
  
  React.useEffect(() => {
    console.log('1.Theme effect')
    
    if(!uid){
      console.log('userTheme, no Uid, stopping')
      return;
    }
    getTheme({ uid }).then((res) => {
      console.log('geting', res)
      if (!res) {
        return;
      }
      if(JSON.stringify(theme) === JSON.stringify(res.theme)){
        return;
      }
      console.log('setting')
      setTheme((p) => {
        return {...p, ...res.theme};
      });
    });
  }, [
    uid,
  ]);
  
  const setDarkMode = () =>
    setTheme((t) => ({ ...t, theme: { ...theme, palette: { mode: "dark" } } }));
  const setLightMode = () =>
    setTheme((t) => ({
      ...t,
      theme: { ...theme, palette: { mode: "light" } },
    }));
  const setButtonClassName = (className: string) => {
    setTheme((t) => ({ ...t, buttonClassName: className }));
    save({ buttonClassName: className });
  };
  const setCustomBackgroundImageSrc = (src: string) => {
    setTheme((t) => ({ ...t, customBackgroundImageSrc: src }));
    save({ customBackgroundImageSrc: src });
  };
  const setBackgroundClassName = (className: string) => {
    setTheme((t) => ({ ...t, backgroundClassName: className }));
    save({ backgroundClassName: className });
  };
  const setButtonTextAlignment = (className: string) => {
    setTheme((t) => ({ ...t, buttonTextAlignment: className }));
    save({ buttonTextAlignment: className });
  };
  const setButtonTransparency = (className: string) => {
    setTheme((t) => ({ ...t, buttonTransparency: className }));
    save({ buttonTransparency: className });
  };
  const setBackgroundColor = (color: string) => {
    setTheme((t) => ({ ...t, backgroundColor: color }));
    save({ backgroundColor: color });
  }
  const setLinkBackgroundColor = (color: string) => {
    setTheme((t) => ({ ...t, linkBackgroundColor: color }));
    save({ linkBackgroundColor: color });
  }
  const updateTheme = () => {
    setTheme((t) => ({ ...t }));
  };

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
    setLinkBackgroundColor,
    backgroundColor: theme.backgroundColor || "",
    linkBackgroundColor: theme.linkBackgroundColor || "",
    setBackgroundColor,
    customBackgroundImageSrc: theme.customBackgroundImageSrc || "",
    backgroundClassName: theme.backgroundClassName || "",
    buttonClassName: theme.buttonClassName || "",
    buttonTextAlignment: theme.buttonTextAlignment || "",
    buttonTransparency: theme.buttonTransparency || "",
  };

  return (
    <UserThemeContext.Provider value={context}>
      {children}
    </UserThemeContext.Provider>
  );
};
