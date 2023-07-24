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
import { getLinkDetails } from "../../db/api";
import { useAuthContext } from "../../providers/AuthProvider";
interface EditLinkWidgetProps {
  title?: string;
  link?: string;
  linkId: string;
  isDisplayed?: boolean;
  index: number;
}
export const EditLinkWidget: React.FC<EditLinkWidgetProps> = (props) => {
  const { isDisplayed, link, title, index, linkId } = props;
  const auth = useAuthContext();
  const uid = auth?.user?.uid
  const linksContext = useLinksContext();
  const [linkStats, setLink] = React.useState('')
  React.useEffect(() => {
    if(!uid){
      return;
    }
    getLinkDetails({uid, linkId}).then((res) => {
      console.log('reas', res)
      setLink(res?.clicks)
    })
  })

  return (
    <Card
      elevation={1}
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <div className={"drag"} style={{display: 'flex'}}>
        <IconButton>
          <DragIndicatorIcon />
        </IconButton>
      </div>
      <CardContent
      sx={{padding:2, width: '100%'}}

      >
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        <EditableTextField
          key={index + "title"}
          index={index}
          fieldName={"title"}
          placeholder={"Name"}
          textValue={title}
        />
        <EditableTextField
          key={index + "link"}
          index={index}
          fieldName="link"
          placeholder={"link"}
          textValue={link}
        />

        </div>
        <div style={{display: 'flex'}}>
       <Button size='small' variant='outlined'>
        {linkStats} Clicks
       </Button>
        <div style={{display: 'flex', marginLeft: 'auto'}}>
       <IconButton onClick={() => linksContext.onDeleteLink(index)}>
          <HighlightOffIcon />
        </IconButton>

        <Switch
          defaultChecked={isDisplayed}
          onChange={(e) => {
            linksContext.onUpdateLink(index, {
              ...linksContext.links[index],
              isDisplayed: e.target.checked,
            });
          }}
          />
          </div>
          </div>
        
      </CardContent>
    </Card>
  );
};
