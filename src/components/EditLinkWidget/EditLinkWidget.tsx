import React from "react";
import {
  IconButton,
  CardContent,
  Typography,
  Card,
  Switch,
  Button,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import BarChartIcon from "@mui/icons-material/BarChart";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { EditableTextField } from "../EditableTextField/EditableTextField";
import { useLinksContext } from "../../providers/LinksProvider";
interface EditLinkWidgetProps {
  title?: string;
  link?: string;
  linkId: string;
  isDisplayed?: boolean;
  index: number;
}
export const EditLinkWidget: React.FC<EditLinkWidgetProps> = (props) => {
  const {  isDisplayed, link, title, index } = props;
  const linksContext = useLinksContext();
  
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
            <EditableTextField key={index+'title'} index={index} fieldName={'title'}  placeholder={title || "Name"} />
            <EditableTextField key={index+'link'} index={index} fieldName='link'  placeholder={link || "link"} />

            <div style={{marginTop: '8px'}}>
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
          <Switch defaultChecked={isDisplayed} onChange={(e) => {linksContext.onUpdateLink(index,{...linksContext.links[index], isDisplayed:e.target.checked})}} />
          <IconButton onClick={() => linksContext.onDeleteLink(index)}>
            <HighlightOffIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};
