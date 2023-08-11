import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LinkIcon from "@mui/icons-material/Link";
import { Leaderboard } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const steps = [
  {
    desc: "Add your links in Admin",
    url: "/admin",
    icon: <LinkIcon fontSize="large" sx={{mr:1}} />,
    name: "admin",
  },
  {
    desc: "Customize your Appearance",
    url: "/appearance",
    icon: <VisibilityIcon fontSize="large" sx={{mr:1}}  />,
    name: "appeareance",
  },
  {
    desc: "See Performance in Analytics",
    url: "/analytics",
    icon: <Leaderboard fontSize="large" sx={{mr:1}}  />,
    name: "analytics",
  },
];

export const Welcome: React.FC = () => {
  const nav = useNavigate();
  const displayedSteps = steps.map((step, i) => {
    return (
      <div style={{ borderRadius: 2, mt: 1, mb: 1 }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              width: "100%",
            }}
          >
            <Typography className={"rainbow-text"} sx={{ mr: 2 }} variant="h4">
              {i + 1}
            </Typography>
            
            <Typography
              fontWeight={"bold"}
              variant="h6"
            >
              {step.desc}
            </Typography>
          </div>
          <Button
            onClick={() => nav("/admin")}
            fullWidth
            className={"rainbow-text"}
            size="large"
            variant="outlined"
          >
            {step.icon}
            {step.name}
          </Button>
        </CardContent>
      </div>
    );
  });
  return (
    <div
      style={{ padding: "0px 16px",
      marginTop: "8px", display: "flex", flexDirection: "column" }}
    >
      <div>
        <div style={{ display: 'flex', flexDirection: 'row'}}>

        <Typography
          className={"rainbow-text"}
          marginBottom={1}
          fontWeight={"900"}
          variant="h3"
          >
          Welcome to BioUp
        </Typography>
          </div>
        <Typography fontWeight={"900"} variant="h5">
          It's easy as 1, 2, 3
        </Typography>
      </div>
      {displayedSteps}
    </div>
  );
};
