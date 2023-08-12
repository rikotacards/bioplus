import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AddLinkWidget } from "../components/AddLinkWidget/AddLinkWidget";
import { EditLinksPanel } from "../components/EditLinksPanel/EditLinksPanel";
import { useAuthContext } from "../providers/AuthProvider";
import { useLinksContext } from "../providers/LinksProvider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { PageSpacing } from "../PageSpacing/PageSpacing";
import { useLoadingContext } from "../providers/LoadingProvider";
import { CreateUsernameNotice } from "../components/CreateUsernameNotice/CreateUsernameNotice";


export const Admin: React.FC = () => {
  const auth = useAuthContext();
  const loadingContext = useLoadingContext();
  const [show, setShow] = React.useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const [isCopied, setIsCopied] = React.useState(false);
  const onClick = () => {
    if (!auth?.username) {
      return;
    }
    setIsCopied(true);
    navigator.clipboard.writeText(`bioUp.io/${auth?.username}`);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const linksContext = useLinksContext();
  return (
    <div style={{ marginTop: "8px" }}>
      <PageSpacing>
        {!loadingContext.isLoading && auth?.isLoggedIn && !auth?.isLoggingIn && !auth?.username && <CreateUsernameNotice/>}
        <Button
        fullWidth
        disabled={!auth?.username}
          variant="outlined"
          onClick={onClick}
          sx={{
            mb: 1,
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CardActionArea sx={{ display: "flex" }}>
            <IconButton>
              <ContentCopyIcon />
            </IconButton>
            <div>
              <Typography>
                {isCopied ? "Copied" : "Share your BioUp Url"}
              </Typography>
            </div>
          </CardActionArea>
        </Button>
        <div>
          <Collapse in={!show}>
            <CardActionArea sx={{borderRadius: '50px'}}>
            <div
              onClick={!!auth?.username ? toggle: undefined}
              style={{
                height: "50px",
                margin: 1,
                cursor: 'pointer',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              <AddCircleOutlineIcon />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Add Link
              </Typography>
            </div>
            </CardActionArea>
          </Collapse>
          <Collapse in={show}>
            <AddLinkWidget toggle={toggle} links={linksContext?.links || []} />
          </Collapse>
        </div>
        <EditLinksPanel links={linksContext?.links || []} />
      </PageSpacing>
    </div>
  );
};
