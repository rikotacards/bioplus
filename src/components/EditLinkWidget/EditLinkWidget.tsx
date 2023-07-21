import React from "react";
import {
  IconButton,
  CardContent,
  Typography,
  Card,
  Switch,
  Button,
  TextField,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import EditIcon from "@mui/icons-material/Edit";
import LeaderboardIcon from "@mui/icons-material/Leaderboard"; // activate / deavtivate, edit title, edit link
import BarChartIcon from "@mui/icons-material/BarChart";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { EditableTextField } from "../EditableTextField/EditableTextField";
export const EditLinkWidget: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const onEditClick = () => {
    setIsEditing(!isEditing);
  };
  return (
    <Card sx={{ display: "flex", width: "100%", alignItems: "center" }}>
      <div className={"drag"}>
        <IconButton>
          <DragIndicatorIcon />
        </IconButton>
      </div>
      <CardContent
        style={{ display: "flex", flexDirection: "row", width: "100%" }}
      >
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
            <EditableTextField placeholder="Name" />
            <EditableTextField placeholder="Link" />

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
