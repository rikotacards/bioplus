import { Button, Card, CardActionArea, Chip, IconButton, Typography } from "@mui/material";
import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
const mainNavItems = [
  {
    name: "admin",
    path: "/admin",
    icon: <LinkIcon sx={{ mr: 0.5 }} />
  },
  {
    name: "appearance",
    path: "/appearance",
    icon: <VisibilityIcon sx={{ mr: 0.5 }} />
  },
  {
    name: "analytics",
    path: "/analytics",
    icon: <LeaderboardIcon sx={{ mr: 0.5 }} />
  },
  {
    name: "",
    path: "/settings",
    icon: <SettingsIcon sx={{ mr: 0.5 }} />

  },
];

export const MainNav: React.FC = () => {
  const auth = useAuthContext();
  const location = useLocation();
  const isLoggedIn = auth?.isLoggedIn;
  const navItems = mainNavItems.map((item) => (
    <Link style={{ marginRight: '4px', display: 'flex', alignItems: 'center' }} relative='route' key={item.path} to={item.path}>
      <Button size='small' variant={location.pathname.indexOf(item.name)>0 ? 'contained' :'outlined'} >
          <div style={{ display: 'flex', alignItems: 'center'}}>
            {item.icon}
          </div>
          <Typography sx={{ textTransform: 'capitalize' }}>
            {item.name}
          </Typography>
      </Button>
    </Link>
  ));
  return (
    <div
      style={{
        padding: '8px',
        display: "flex",
        alignItems: 'center',
        justifyContent: "flex-start",
      }}
    >
      {!isLoggedIn && <Link relative={'route'} to={'/'}>
        <IconButton>
          <HomeIcon />
        </IconButton>
      </Link>}
      <div style={{ width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', overflowX: 'scroll' }}>

        {navItems}
      </div>
    </div>
  );
};
