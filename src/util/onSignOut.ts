import { useAuthContext } from "../providers/AuthProvider";

export const onSignOut = () => {
  const a = useAuthContext();
  return a.signOut
}