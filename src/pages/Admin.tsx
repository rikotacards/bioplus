import React from "react";
import { Button, Collapse, TextField, Typography } from "@mui/material";

import { AddLinkWidget } from "../components/AddLinkWidget/AddLinkWidget";
import { ClaimUsernameWidget } from "../components/ClaimUsernameWidget/ClaimUsernameWidget";
import { EditLinksPanel } from "../components/EditLinksPanel/EditLinksPanel";
import { useAuthContext } from "../providers/AuthProvider";
import { useLinksContext } from "../providers/LinksProvider";
import { getUsernameFromUsers } from "../db/api";
import { useLoadingContext } from "../providers/LoadingProvider";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export const Admin: React.FC = () => {
  const auth = useAuthContext();
  const loadingContext = useLoadingContext();
  const uid = auth?.user?.uid;
  const [show, setShow] = React.useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const linksContext = useLinksContext();
  console.log('adminloaded', auth)
  return (
    <div style={{marginTop: '8px'}}>
      {!loadingContext.isLoading && !auth.username && <ClaimUsernameWidget />}
      <div>
        <Collapse in={!show}>
          <div
            onClick={toggle}
            style={{height: '50px', margin: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          
          ><AddCircleOutlineIcon/>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Add Link
            </Typography>
          </div>
        </Collapse>
        <Collapse in={show}>
          <AddLinkWidget toggle={toggle} links={linksContext?.links || []} />
        </Collapse>
      </div>
      <EditLinksPanel links={linksContext?.links || []} />
    </div>
  );
};
