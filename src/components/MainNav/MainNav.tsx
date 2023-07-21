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
    <Link style={{ width: "100%" }} to={item.path}>
      <Button variant="outlined">{item.name}</Button>
    </Link>
  ));
  return (
    <div
      style={{
        padding: '8px',
        display: "flex",
        justifyContent: "space-between",
        background: "white",
      }}
    >
      {navItems}
    </div>
  );
};
