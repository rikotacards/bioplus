import React from "react";
import { EditProfilePanel } from "../components/EditProfilePanel/EditProfilePanel";
import { Box, Fab, Typography } from "@mui/material";
import { useDrawerContext } from "../providers/DrawerProvider";
import { BackgroundSelector } from "../components/BackgroundSelector/BackgroundSelector";
import { BorderRadiusSelector } from "../components/LinkStyleSelector/LinkStyleSelector";
import "./Appearance.css";
import { LinkTransparencySelector } from "../components/LinkTransparencySelector/LinkTransparencySelector";
import { useUserThemeContext } from "../providers/UserThemeProvider";
import { PageSpacing } from "../PageSpacing/PageSpacing";
export const Appearance: React.FC = () => {
  const drawerContext = useDrawerContext();
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
        <BackgroundSelector />
        <BorderRadiusSelector />
        <LinkTransparencySelector />

        <div
          style={{
            position: "fixed",
            bottom: "0",
            alignSelf: "center",
            display: "flex",
            margin: "8px",
            alignItems: "center",
          }}
        >
          <Fab
            color="primary"
            variant="extended"
            onClick={drawerContext?.onToggle}
          >
            <Typography sx={{ textTransform: "capitalize" }}>
              Preview
            </Typography>
          </Fab>
        </div>
      </Box>
    </PageSpacing>
  );
};
