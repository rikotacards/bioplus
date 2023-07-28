import React from "react";
import { auth } from "../firebase/firebase";
import { User, getRedirectResult } from "firebase/auth";
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
  signOut: () => Promise<void>;
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
  React.useEffect(() => {
    loadingContext.setLoadingTrue()

    const subscriber = auth.onAuthStateChanged((d) => {
      console.log('AUTH STATE CHANGED', d)
      if (d?.uid) {
        setUser({ ...user, ...d });
        setLogIn(true);
        // used if signing in from Google
        getUsernameFromUsers({ uid:d.uid }).then((res) => {
          console.log('AUTHUID',res)
          setUsername(res);
        }).then(() => {

          loadingContext.setLoadingFalse()
        })
        
      } else {
        console.log('FALSENOW')
        setLogIn(false);
        setUser({} as User);
        loadingContext.setLoadingFalse()
        
    }
    });
    getRedirectResult(auth).then((res) => {
      console.log('geting red', res)
      res?.user &&
        res.user?.photoURL &&
        addUserToDb({ uid: res.user.uid, photoUrl: res.user.photoURL });
    });
    return subscriber;
  }, [isLoggedIn]);
  const context: AuthContextProps = {
    isLoggedIn,
    user,
    username,
    signOut: auth.signOut,
    setUsername: (username: string) => setUsername(username)

  };
  
  return (
    <AuthContext.Provider value={context}>{
      children
      }</AuthContext.Provider>
  );
};
