import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
const mainNavItems = [
  {
    name: "admin",
    path: "/admin",
  },
  {
    name: "appearance",
    path: "/admin/appearance",
  },
  {
    name: "analytics",
    path: "/admin/analytics",
  },
  {
    name: "settings",
    path: "/admin/settings",
  },
];

export const MainNav: React.FC = () => {
  const navItems = mainNavItems.map((item) => (
    <Link style={{marginRight: '4px'}} relative='route' key={item.path} to={item.path}>
      <Button size='small' variant="outlined">
        <Typography sx={{textTransform: 'capitalize'}}>
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
        justifyContent: "space-between",
      }}
    >
      <Link relative={'route'} to={'/'}>
      <IconButton>
        <HomeIcon/>
      </IconButton>
      </Link>
      {navItems}
    </div>
  );
};
