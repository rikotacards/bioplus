import { ThemeOptions } from "@mui/material";
import React from "react";
import { userDefaultTheme } from "../configs/userDefaultTheme";
import { useAuthContext } from "./AuthProvider";
import { UserTheme, getTheme, getUsernameDetails, updateUserTheme } from "../db/api";
import { useLocation } from "react-router-dom";
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
  setButtonTransparency: (className: string) => void;
  save: () => void;
  updateTheme: (args: { [key: string]: any }) => void;
}

const defaultTheme = {
  buttonClassName: "",
  customBackgroundImageSrc: "",
  buttonTextAlignment: "left",
  buttonTransparency: "",
};

const UserThemeContext = React.createContext({} as UserThemeContextProps);
export const useUserThemeContext = () => React.useContext(UserThemeContext);

interface UserThemeProviderProps {
  children: React.ReactNode;
}
interface CustomStyles {
  buttonClassName: string;
  backgroundClassName: string;
  buttonTextAlignment: string;
  buttonTransparency: string;
  customBackgroundImageSrc: string;
}

export const UserThemeProvider: React.FC<
  UserThemeProviderProps & CustomStyles
> = ({ children }) => {
  const [theme, setTheme] = React.useState<CustomStyles>(
    defaultTheme as UserThemeContextProps
  );
  const auth = useAuthContext();
  const location = useLocation();
  console.log(location)
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
    
    if (!isPrivate && usernameFromPath) {
      getUsernameDetails(usernameFromPath).then((res) => {
        console.log("Rds", res)
        if (res?.uid) {
          console.log("LOL")
          const uidFromPath = res.uid;
          getTheme({ uid: uidFromPath })
          .then((res) => {
            console.log("Getting theme", res);
            if (!res) {
              return;
            }
            setTheme(() => {
              console.log("setting");
              return res.theme;
            })
          })
        }
      });
      return;
    }
    if(!uid){
      return;
    }
    getTheme({ uid }).then((res) => {
      console.log("Getting theme", res);
      if (!res) {
        return;
      }
      setTheme(() => {
        console.log("setting");
        return res.theme;
      });
    });
  }, [
    theme.backgroundClassName,
    theme.buttonClassName,
    theme.buttonTextAlignment,
    theme.buttonTransparency,
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
    setTheme(() => ({ ...theme, buttonClassName: className }));
    save({ buttonClassName: className });
  };
  const setCustomBackgroundImageSrc = (src: string) => {
    setTheme(() => ({ ...theme, customBackgroundImageSrc: src }));
    save({ customBackgroundImageSrc: src });
  };
  const setBackgroundClassName = (className: string) => {
    setTheme(() => ({ ...theme, backgroundClassName: className }));
    save({ backgroundClassName: className });
  };
  const setButtonTextAlignment = (className: string) => {
    setTheme(() => ({ ...theme, buttonTextAlignment: className }));
    save({ buttonTextAlignment: className });
  };
  const setButtonTransparency = (className: string) => {
    setTheme(() => ({ ...theme, buttonTransparency: className }));
    save({ buttonTransparency: className });
  };
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
