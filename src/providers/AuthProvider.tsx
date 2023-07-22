import React from "react";
import { auth } from "../firebase/firebase";
import { User, getRedirectResult } from "firebase/auth";
import { addUserToDb, getUsernameFromUsers } from "../db/api";
import { useLoadingContext } from "./LoadingProvider";
interface AuthProviderProps {
  children: React.ReactNode;
}
interface AuthContextProps {
  isLoggedIn: boolean;
  user?: User;
  signOut: () => Promise<void>
}
export const AuthContext = React.createContext({} as AuthContextProps);
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLogIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const loadingContext = useLoadingContext();
  
  const [user, setUser] = React.useState({} as User);
  React.useEffect(() => {
    loadingContext.setLoadingTrue()

    const subscriber = auth.onAuthStateChanged((d) => {
      if (d?.uid) {
        setUser({ ...user, ...d });
        setLogIn(true);
        loadingContext.setLoadingFalse()
        
      } else {
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
  }, []);
  const context: AuthContextProps = {
    isLoggedIn,
    user,
    signOut: auth.signOut
  };
  
  return (
    <AuthContext.Provider value={context}>{
      children
      }</AuthContext.Provider>
  );
};
