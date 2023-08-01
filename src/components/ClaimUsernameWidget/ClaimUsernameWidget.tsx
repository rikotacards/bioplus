import React from "react";
import {
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { addUsername } from "../../db/api";
import { useAuthContext } from "../../providers/AuthProvider";
export const ClaimUsernameWidget: React.FC = () => {
  const [username, setUsername] = React.useState('')
  const auth = useAuthContext();
  const uid = auth?.user?.uid
  const [hasError, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUsername(e.target.value)
  }
  const onSubmit = () => {
    uid && addUsername({uid, username}).catch((e) => {
      setError(true);
      setErrorMessage('Dupe')
    })
  }
  return (
    <div>
      <Typography variant="h5" sx={{fontWeight: 'bold', mb:1}}>Claim Username</Typography>

      <Card elevation={1} sx={{ mb: 1 }}>
        <CardContent sx={{display: 'flex', width: '100%'}}>
            <TextField fullWidth error={hasError} onChange={onChange} size="small" variant="outlined" />
            <Button onClick={onSubmit} sx={{ ml: 1 }} variant="contained">
              Claim
            </Button>
        </CardContent>
      </Card>
    </div>
  );
};
