import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
const provider = new GoogleAuthProvider();

export const onSignIn = () => {
  const auth = getAuth();
  signInWithRedirect(auth, provider)
}