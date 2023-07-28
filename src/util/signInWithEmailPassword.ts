import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React from 'react';

export const signInWithEmailPassword = ({email, password}:{email: string, password: string}) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth,email,password).then((res) => {
    if(res.user){
      return res
    }
  }).then((e) => {
    console.log(e)
    return e
    throw new Error('Error when signing up with email and password')
  })
}