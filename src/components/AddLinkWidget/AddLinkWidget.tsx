import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { useAuthContext } from "../../providers/AuthProvider";
import { isValidUrl } from "../../util/validateLink";
import { useLinksContext } from "../../providers/LinksProvider";
import { addLink } from "../../db/api";
interface AddLinkWidgetProps {
  toggle: () => void;
  links: {title: string, link: string, linkId: string, isDisplayed: boolean}[]
}
export const AddLinkWidget: React.FC<AddLinkWidgetProps> = ({toggle}) => {
  const linksContext = useLinksContext();
  const [url, setUrl] = React.useState("");
  const auth = useAuthContext();
  const [hasError, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')
  const uid = auth?.user?.uid;
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setUrl(e.target.value.toLowerCase());
  };
  const onAdd = () => {
    setError(false);
    if (!uid) {
      return;
    }
    if(url.length === 0){
      return;
    }
    if (!isValidUrl(url)) {
      setError(true);
      setErrorMessage('Url is not valid')
      return;
    }
    addLink({title:'', link: url, isDisplayed: true,uid}).then((res) => {
      if(res){
        linksContext.onAddLink({link:url, title: '', linkId: res, isDisplayed: true})
      }
      toggle()
    })
    setUrl('')
    
  };
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <div style={{marginBottom:'8px', display: "flex", alignItems: 'center' }}>
          <Typography sx={{fontWeight: 'bold'}} variant='h6'>Enter URL</Typography>
          <div style={{ marginLeft: "auto" }}>
            <IconButton onClick={toggle}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <TextField
            name="url"
            placeholder="www.myawesomesite.com"
            error={hasError}
            onChange={onChange}
            variant="outlined"
            value={url}
            type="url"
            autoComplete="off"
            helperText={errorMessage}
          />
          <Button size="large" fullWidth onClick={onAdd} sx={{ mt: 1 }} variant="contained">
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
