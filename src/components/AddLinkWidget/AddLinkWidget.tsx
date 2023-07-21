import React from "react";



import CloseIcon from '@mui/icons-material/Close';
import { Button,Typography, TextField, Card, CardContent, IconButton } from "@mui/material";
export const AddLinkWidget: React.FC = () => {
  const [url, setUrl] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrl(e.target.value);
  }
  const onAdd = () => {
    console.log(url)
  }
  return (
    <Card sx={{mb:1}}>
      <CardContent>
        <div style={{display: 'flex'}}>
          <Typography>Enter URL</Typography>
          <div style={{marginLeft: 'auto'}}><IconButton><CloseIcon/></IconButton></div>
        </div>
        <div>
        <TextField onChange={onChange} size="small" variant="outlined" />
        <Button onClick={onAdd} sx={{ml:1}} variant='contained'>Add</Button>
        </div>
      </CardContent>
    </Card>
  );
};
