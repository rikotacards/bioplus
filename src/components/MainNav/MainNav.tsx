import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const mainNavItems = [
  {
    name: "admin",
    path: "admin",
  },
  {
    name: "appearance",
    path: "admin/appearance",
  },
  {
    name: "analytics",
    path: "admin/analytics",
  },
  {
    name: "settings",
    path: "admin/settings",
  },
];

export const MainNav: React.FC = () => {
  const navItems = mainNavItems.map((item) => (
    <Link key={item.path} to={item.path}>
      <Button size='small' variant="outlined">{item.name}</Button>
    </Link>
  ));
  return (
    <div
      style={{
        padding: '8px',
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {navItems}
    </div>
  );
};
