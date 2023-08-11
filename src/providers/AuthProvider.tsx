import React from "react";
import { auth } from "../firebase/firebase";
import { User, getRedirectResult, signOut } from "firebase/auth";
import { addUserToDb, getUsernameFromUsers } from "../db/api";
import { useLoadingContext } from "./LoadingProvider";
import { useNavigate } from "react-router-dom";
interface AuthProviderProps {
  children: React.ReactNode;
}
interface AuthContextProps {
  isLoggedIn: boolean;
  user?: User;
  username?: string;
  signOut: () => void;
  isLoggingIn: boolean;
  setUsername: (username: string) => void;
}
export const AuthContext = React.createContext({} as AuthContextProps);
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLogIn] = React.useState(false);
  const loadingContext = useLoadingContext();
  const nav = useNavigate();

  const [username, setUsername]=React.useState("")
  const [user, setUser] = React.useState({} as User);
  const [isLoggingIn, setIsLogginIn] = React.useState(true);
  const onSignOut = () => {
    signOut(auth).then(() => {
      setUser({} as User);
      setUsername('')
      setLogIn(false)
    }).then(() => nav('/'))
  }
  React.useEffect(() => {
    loadingContext.setLoadingTrue()

    const subscriber = auth.onAuthStateChanged((d) => {
      if (d?.uid) {
        setUser({ ...user, ...d });
        setLogIn(true);
        setIsLogginIn(false);
        // used if signing in from Google
        getUsernameFromUsers({ uid:d.uid }).then((res) => {
          setUsername(res);
        }).then(() => {
          loadingContext.setLoadingFalse()
          
        })
        
      } else {
        setLogIn(false);
        setIsLogginIn(false)
        setUser({} as User);
        loadingContext.setLoadingFalse()
        
    }
    });
    getRedirectResult(auth).then((res) => {
      res?.user &&
        res.user?.photoURL &&
        addUserToDb({ uid: res.user.uid, photoUrl: res.user.photoURL }).then(() => nav('/admin'))
    });
    return subscriber;
  }, [isLoggedIn]);
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
