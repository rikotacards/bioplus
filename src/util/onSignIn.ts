import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
const provider = new GoogleAuthProvider();

export const onSignIn = () => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
}