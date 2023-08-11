import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LinkIcon from "@mui/icons-material/Link";
import { Leaderboard } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const todos = [{}];

export const Welcome: React.FC = () => {
  const nav = useNavigate();
  return (
    <div
      style={{ padding: "0px 8px", display: "flex", flexDirection: "column" }}
    >
      <Card>
        <CardContent>
          <Typography marginBottom={1} fontWeight={"bold"} variant="h3">
            Welcome to BioUp
          </Typography>
          <Typography fontWeight={"bold"} variant="h5">
            It's easy as 1, 2, 3
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 2, mt: 1, mb: 1 }}>
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
            <Typography sx={{ mr: 2 }} variant="h4">
              1
            </Typography>
            <LinkIcon fontSize="large" sx={{ mr: 2 }} />
            <Typography fontWeight={"bold"} variant="h6">
              Add your links in Admin
            </Typography>
          </div>
          <Button
            onClick={() => nav("/admin")}
            fullWidth
            size="large"
            variant="outlined"
          >
            <LinkIcon />
            Admin
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 2, mb: 1 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              width: "100%",
            }}
          >
            <Typography sx={{ mr: 2 }} variant="h4">
              2
            </Typography>

            <VisibilityIcon fontSize="large" sx={{ mr: 2 }} />
            <Typography fontWeight={"bold"} variant="h6">
              Customize in Appearance
            </Typography>
          </div>
          <Button
            onClick={() => nav("/appearance")}
            fullWidth
            size="large"
            variant="outlined"
          >
            <VisibilityIcon />
            Appearance
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 2, mb: 1 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Typography sx={{ mr: 2 }} variant="h4">
              3
            </Typography>

            <Leaderboard fontSize="large" sx={{ mr: 2 }} />
            <Typography fontWeight={"bold"} variant="h6">
              See Perfomance in Analytics
            </Typography>
          </div>
          <Button
            onClick={() => nav("/analytics")}
            fullWidth
            size="large"
            variant="outlined"
          >
            <Leaderboard sx={{ mr: 1 }} />
            Analytics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
