import React from 'react';
import {AppBar, Toolbar} from '@mui/material'
import { MainNav } from '../MainNav/MainNav';
export const TopAppBar: React.FC = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>1Link</Toolbar>
        <MainNav/>
      </AppBar>
      <Toolbar />
    </>
  )

}