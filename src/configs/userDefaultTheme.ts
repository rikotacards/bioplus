import { ThemeOptions } from "@mui/material";
import { red } from "@mui/material/colors";
//**@description user theme**
export const userDefaultTheme: ThemeOptions = {
  palette: {
    background: {
      // paper: 'black',
      // default: 'black'
    },
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: 'system-ui'
  }
}