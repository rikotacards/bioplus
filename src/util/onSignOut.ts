import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

export const onSignOut = () => {
  const a = getAuth();
  signOut(a)
}