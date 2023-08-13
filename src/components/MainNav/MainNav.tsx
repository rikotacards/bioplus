import {
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { ENABLE_BOTTOM_BAR } from "../../configs/flags";
import { useDrawerContext } from "../../providers/DrawerProvider";

interface ChipButtonProps {
  name: string;
  icon: JSX.Element;
  isSelected: boolean;
  iconOnly?: boolean;
}
export const ChipButton: React.FC<ChipButtonProps> = ({
  iconOnly,
  name,
  icon,
  isSelected,
}) => {
  
  return (
    <Chip
      sx={{ color: "white" }}
      variant={isSelected ? "filled" : "outlined"}
      icon={!iconOnly && icon}
      label={
        iconOnly ? (
          icon
        ) : (
          <Typography variant="body2" color="white">
            {name}
          </Typography>
        )
      }
    />
  );
};
export const MainNav: React.FC = () => {
  const auth = useAuthContext();
  const location = useLocation();
  const drawer = useDrawerContext();
  const isLoggedIn = auth?.isLoggedIn;
  const mainNavItems = [
    {
      name: "admin",
      path: "/admin",
      icon: <LinkIcon sx={{ mr: ENABLE_BOTTOM_BAR ? 0 : 0.5 }} />,
    },
    {
      name: "appearance",
      path: "/appearance",
      icon: <VisibilityIcon sx={{ mr: ENABLE_BOTTOM_BAR ? 0 : 0.5 }} />,
    },
    {
      name:  isLoggedIn ? 'profile' : " ",
      path: isLoggedIn ? "/profile" : '/ ',
      icon: <AccountCircleIcon sx={{ mr: ENABLE_BOTTOM_BAR ? 0 : 0.5 }} />,
    },
  
    {
      name: "analytics",
      path: "/analytics",
      icon: <LeaderboardIcon sx={{ mr: ENABLE_BOTTOM_BAR ? 0 : 0.5 }} />,
    },
    
  ];
  const navItems = mainNavItems.map((item) => (
    <Link
      style={{ marginRight: "4px", display: "flex", alignItems: "center" }}
      relative="route"
      key={item.path}
      to={item.path}
    >
      {ENABLE_BOTTOM_BAR ? (
        <div
          style={{
            borderRadius: "100%",
            border:
              location.pathname.indexOf(item.name) >= 0 ? "0px solid white" : 0,
          }}
        >
          <IconButton
            
            color={
              location.pathname.indexOf(item.name) >= 0 ? "primary" : "default"
            }
          >
            {item.icon}
          </IconButton>
        </div>
      ) : (
        // <ChipButton iconOnly={true} isSelected={location.pathname.indexOf(item.name) >= 0} name={item.name} icon={item.icon} />
        <Button
          sx={{ color: "white" }}
          size="small"
          color="inherit"
          variant={
            location.pathname.indexOf(item.name) > 0 ? "contained" : "outlined"
          }
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {item.icon}
          </div>
          <Typography sx={{ textTransform: "capitalize" }}>
            {item.name}
          </Typography>
        </Button>
      )}
    </Link>
  ));
  return (
    <div
      style={{
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: ENABLE_BOTTOM_BAR ? "space-around" : "flex-start",
          overflowX: "scroll",
        }}
      >
        {!isLoggedIn && (
        <Link relative={"route"} to={"/"}>
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
      )}
        {navItems}
        {isLoggedIn && (
        <Link relative={"route"} to={"/settings"}>
          <IconButton color={location.pathname.indexOf('settings') >= 0  ? 'primary': 'default'}>
            <SettingsIcon />
          </IconButton>
        </Link>
      )}
      </div>
    </div>
  );
};
