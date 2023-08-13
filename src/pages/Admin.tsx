import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  Collapse,
  Drawer,
  Fab,
  IconButton,
  TextField,
  Toolbar,
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
import { AddLinkBanner } from "../components/AddLinkBanner/AddLinkBanner";
import { ENABLE_BOTTOM_BAR } from "../configs/flags";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: 'relative',
        marginTop: ENABLE_BOTTOM_BAR ? "16px" : "8px",
        justifyContent: "center",
      }}
    >
      <PageSpacing>
        {!loadingContext.isLoading &&
          auth?.isLoggedIn &&
          !auth?.isLoggingIn &&
          !auth?.username && <CreateUsernameNotice />}
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
       
        {!auth.isLoggingIn && !auth.isLoggedIn && <AddLinkBanner />}

        <EditLinksPanel links={linksContext?.links || []} />
      </PageSpacing>
      {ENABLE_BOTTOM_BAR && <Toolbar/>}
      {ENABLE_BOTTOM_BAR && <Toolbar/>}

    
    </div>
  );
};
