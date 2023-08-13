import React from 'react'
import {
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  IconButton,
  Toolbar,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { addLink } from '../db/api';
import { useDrawerContext } from '../providers/DrawerProvider';
import { useAuthContext } from '../providers/AuthProvider';
import { useLinksContext } from '../providers/LinksProvider';
import { isValidUrl } from '../util/validateLink';
export const AddUrlDrawerContent: React.FC = () => {
  const linksContext = useLinksContext();
  const [url, setUrl] = React.useState("");
  const auth = useAuthContext();
  const dc = useDrawerContext();
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
      document.documentElement.scrollTo(0, 0);

      dc.onToggle()
    })
    setUrl('')
  }
    
  return (
<div style={{display: 'flex', flexDirection: 'column', padding: '8px', WebkitBorderTopRightRadius:'50px'}}>
  <Toolbar>
  <Typography mb={1} variant='body1' fontWeight={'bold'}>Enter Url</Typography><div style={{marginLeft: 'auto'}}><IconButton onClick={dc.onToggle} ><KeyboardArrowDownIcon/></IconButton></div>
  </Toolbar>
         
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
            Add Url
          </Button>
        </div>
  )
}