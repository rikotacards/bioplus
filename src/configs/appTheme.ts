import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const appTheme = createTheme({
palette: {
  
  mode: 'dark',
  background: {
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
  },
});
export default appTheme;