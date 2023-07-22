import React from "react";
import { Button, CircularProgress } from "@mui/material";

import { AddLinkWidget } from "../components/AddLinkWidget/AddLinkWidget";
import { ClaimUsernameWidget } from "../components/ClaimUsernameWidget/ClaimUsernameWidget";
import { EditLinksPanel } from "../components/EditLinksPanel/EditLinksPanel";
import { useAuthContext } from "../providers/AuthProvider";
import { useLinksContext } from "../providers/LinksProvider";
import { getUsernameFromUsers } from "../db/api";

export const Admin: React.FC = () => {
  const auth = useAuthContext()
  const uid = auth?.user?.uid;

  const linksContext = useLinksContext();
  const [username, setUsername] = React.useState('');
  React.useEffect(() => {
    uid && getUsernameFromUsers({uid}).then((res) => {
      console.log('res', res)
      setUsername(res)
    })
  },[uid])
  console.log('username, ', username)
  return (
    <>
      {!username?.length && auth?.user?.uid && <ClaimUsernameWidget/>}
      <Button size='large' sx={{mb:1}} fullWidth variant='contained'>Add Link</Button>
      <AddLinkWidget links={linksContext?.links || []}/>
      <EditLinksPanel links={linksContext?.links || []}/>
    </>
  );
};
