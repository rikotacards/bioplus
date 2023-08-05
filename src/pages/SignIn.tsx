import { Button, TextField, Typography } from '@mui/material';
import { GoogleAuthProvider, getAuth, signInWithRedirect, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SignIn: React.FC = () => {
  const auth = getAuth();
  const nav = useNavigate();
  const provider = new GoogleAuthProvider();
  React.useEffect(() => {
    if(auth.currentUser?.uid){
      nav('/admin')
    }
  },[auth.currentUser?.uid])

  const [email, setEmail] = React.useState('')
  const [pw, setPw] = React.useState<string>('')

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const onPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  }

  const onSignInWithEmailPassword = () => {
    signInWithEmailAndPassword(auth, email, pw)
  }

  const onGoogleSignIn = () => {
    signInWithRedirect(auth, provider).then(() => {
      nav('/admin')
    })
  }
  return (

    <div style={{marginTop:'8px', display: 'flex', flexDirection: 'column'}}>
      <div style={{marginBottom: '8px'}}>
        <Typography variant='h4' sx={{fontWeight: 'bold'}}>Sign in with Email</Typography>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <TextField sx={{mb:2}} type='email' placeholder='email' onChange={onEmailChange} />
        <TextField type='password' sx={{mb:2}} placeholder='email' onChange={onPwChange} />
        <Button sx={{mb:2}} variant='contained' fullWidth onClick={onSignInWithEmailPassword}>
          Sign In
        </Button>
      </div>
      <Button fullWidth variant='contained' onClick={onGoogleSignIn}>
        Sign in with Google
      </Button>
    </div>

  )
}