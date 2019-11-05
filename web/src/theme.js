import { createMuiTheme } from '@material-ui/core';
import { indigo, red, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo.A400,
    },
    secondary: {
      main: teal.A400,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
