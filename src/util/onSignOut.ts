import { useAuthContext } from "../providers/AuthProvider";
import { getAuth } from "firebase/auth";

export const onSignOut = () => {
  const a = getAuth()
  a.signOut()
}