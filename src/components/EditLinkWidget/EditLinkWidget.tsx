import React from "react";
import {
  IconButton,
  CardContent,
  Typography,
  Card,
  Switch,
  Button,
} from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard"; // activate / deavtivate, edit title, edit link
import BarChartIcon from "@mui/icons-material/BarChart";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
export const EditLinkWidget: React.FC = () => {
  return (
    <Card>
      <CardContent style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flex: 1 }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            <Typography>Title</Typography>
            <Typography>Link</Typography>
            <div>
              <Button variant="outlined" size="small">
                <div
                  style={{
                    textTransform: "capitalize",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BarChartIcon />
                  <Typography>0 Clicks</Typography>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Switch />
          <IconButton>
            <HighlightOffIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};
