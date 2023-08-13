import React from "react";
import { auth } from "../firebase/firebase";
import { User, getRedirectResult, signOut } from "firebase/auth";
import { Link, addUserToDb, addUsername, getUsernameFromUid } from "../db/api";
import { useLoadingContext } from "./LoadingProvider";
import { useNavigate } from "react-router-dom";
import { useLinksContext } from "./LinksProvider";
interface AuthProviderProps {
  children: React.ReactNode;
}
interface AuthContextProps {
  isLoggedIn: boolean;
  user?: UserCustom;
  username?: string;
  signOut: () => void;
  isLoggingIn: boolean;
  setUsername: (username: string) => void;
}
export interface UserCustom extends User {
  bio?: string;
  username?: string;
  links: Link[]
  isPremium?: boolean;
}
export const AuthContext = React.createContext({} as AuthContextProps);
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLogIn] = React.useState(false);
  const loadingContext = useLoadingContext();
  const nav = useNavigate();

  const [username, setUsername]=React.useState("")
  const [user, setUser] = React.useState({} as UserCustom);
  const [isLoggingIn, setIsLogginIn] = React.useState(true);
  const links = useLinksContext();
  const onSignOut = () => {
    signOut(auth).then(() => {
      setUser({} as UserCustom);
      setUsername('')
      setIsLogginIn(false)
      setLogIn(false)
    }).then(() => nav('/'))
  }
  React.useEffect(() => {
    loadingContext.setLoadingTrue()

    const subscriber = auth.onAuthStateChanged((authObject) => {
      if (authObject?.uid) {
        setUser({ ...user, ...authObject });
        addUserToDb({ uid: authObject?.uid, photoURL: authObject.photoURL })
        setLogIn(true);
        setIsLogginIn(false);
        // used if signing in from Google
        getUsernameFromUid({ uid:authObject.uid }).then((res) => {
          if(res?.length > 0){
            setUsername(res);
          }
        }).then(() => {
          loadingContext.setLoadingFalse()
        })
        
      } else {
        setLogIn(false);
        setIsLogginIn(false)
        setUser({} as UserCustom);
        loadingContext.setLoadingFalse()
        
    }
    });
    // getRedirectResult(auth).then((res) => {
    //   console.log('Getting redirect result', auth)
    //   res?.user &&
    //     res.user?.photoURL &&
    // });
    return subscriber;
  }, [isLoggedIn, addUsername, username]);
  const context: AuthContextProps = {
    isLoggedIn,
    user,
    username,
    isLoggingIn,
    signOut: onSignOut,
    setUsername: (username: string) => setUsername(username)
  };
  
  return (
    <AuthContext.Provider value={context}>{
      children
      }</AuthContext.Provider>
  );
};
