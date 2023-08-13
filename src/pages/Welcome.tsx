import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LinkIcon from "@mui/icons-material/Link";
import { Leaderboard } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import { MockProfile } from "../components/MockProfile/MockProfile";
import { MockProfileWithBackground } from "../components/MockProfile/MockProfileWithBackground";
import { MockTrendLineStyled } from "../components/MockTrendLineStyled/MockTrendLineStyled";
import { MockTrendline } from "../components/MockTrendline/MockTrendLine";
const withStyle = (component: React.ReactNode) => {
  return (
    <div style={{ margin: "8px", borderRadius: "10px", overflow: "hidden" }}>
      {component}
    </div>
  );
};
const steps = [
  {
    desc: "Add your links in Admin",
    url: "/admin",
    icon: <LinkIcon fontSize="large" sx={{ mr: 1 }} />,
    name: "admin",
    sample: withStyle(<MockProfile/>)
  },
  {
    desc: "Customize your Appearance",
    url: "/appearance",
    icon: <VisibilityIcon fontSize="large" sx={{ mr: 1 }} />,
    name: "appeareance",
    sample: withStyle(<MockProfileWithBackground />),
  },
  {
    desc: "See Performance in Analytics",
    url: "/analytics",
    icon: <Leaderboard fontSize="large" sx={{ mr: 1 }} />,
    name: "analytics",
    sample: withStyle(<MockTrendline/>)
  },
];

export const Welcome: React.FC = () => {
  const nav = useNavigate();
  React.useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, []);
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

            <Typography fontWeight={"bold"} variant="h6">
              {step.desc}
            </Typography>
          </div>
          {step.sample}

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
      style={{
        padding: "0px 16px",
        marginTop: "8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
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
