import React from "react";
import { Button } from "@mui/material";
import { EditLinkWidget } from "../components/EditLinkWidget/EditLinkWidget";
import { AddLinkWidget } from "../components/AddLinkWidget/AddLinkWidget";
import { ClaimUsernameWidget } from "../components/ClaimUsernameWidget/ClaimUsernameWidget";
export const Admin: React.FC = () => {
  return (
    <>
      <ClaimUsernameWidget/>
      <Button sx={{mb:1}} fullWidth variant='contained'>Add Link</Button>
      <AddLinkWidget/>
      <EditLinkWidget />
    </>
  );
};
