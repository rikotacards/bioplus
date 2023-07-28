import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const provider = new GoogleAuthProvider();

export const useOnSignIn = () => () => {
  const auth = getAuth();
 
  signInWithPopup(auth, provider)
}

