import React from "react";
import { EditProfilePanel } from "../components/EditProfilePanel/EditProfilePanel";
import { Box, Button, Fab, Typography } from "@mui/material";
import { useDrawerContext } from "../providers/DrawerProvider";
import { BackgroundSelector } from "../components/BackgroundSelector/BackgroundSelector";
import { BorderRadiusSelector } from "../components/LinkStyleSelector/LinkStyleSelector";
import "./Appearance.css";
import { LinkTransparencySelector } from "../components/LinkTransparencySelector/LinkTransparencySelector";
import { PageSpacing } from "../PageSpacing/PageSpacing";
import { TextAlignmentSelector } from "../components/TextAlignmentSelector/TextAlignmentSelector";
import { UserCustom, useAuthContext } from "../providers/AuthProvider";
import { getUser } from "../db/api";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { AppearanceBanner } from "../components/AppearanceBanner/AppearanceBanner";
import { Upcoming } from "@mui/icons-material";
import { ENABLE_BOTTOM_BAR } from "../configs/flags";
export const Appearance: React.FC = () => {
  const drawerContext = useDrawerContext();
  const auth = useAuthContext();
  const { isLoggedIn } = auth;
  const uid = auth.user?.uid;
  const [user, setUser] = React.useState<UserCustom | undefined>(
    {} as UserCustom
  );

  React.useEffect(() => {
    
    if (!uid) {
      return;
    }
    drawerContext?.setComponent("preview");
    getUser({ uid }).then((res) => {
      setUser(res);
    });
  }, [uid]);

  const onClick = () => {
    drawerContext?.onToggle();
  };
  return (
    <PageSpacing>
      <Box
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EditProfilePanel />
        {!user?.isPremium && <AppearanceBanner />}
        {!ENABLE_BOTTOM_BAR && <Button
          onClick={onClick}
          endIcon={<ArrowCircleUpIcon />}
          sx={{ borderRadius: "20px" }}
          variant="contained"
          size="large"
        >
          Preview profile
        </Button>}
        <BackgroundSelector />
        <BorderRadiusSelector />
        <TextAlignmentSelector />
        <LinkTransparencySelector />

        <div
          style={{
            position: "fixed",
            bottom: ENABLE_BOTTOM_BAR ? "50px": "10px",
            width: "100%",
            alignSelf: "center",
            display: "flex",
            padding: '16px',
            alignItems: "center",
            justifyContent: ENABLE_BOTTOM_BAR ? 'flex-end' : undefined
          }}
        >
        
        </div>
      </Box>
      <div className="extra-spacing" style={{ height: "100px" }} />
    </PageSpacing>
  );
};
