import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const onSignOut = () => {
  const nav = useNavigate();
  const a = getAuth()
  a.signOut().then(() => nav('/'))
}