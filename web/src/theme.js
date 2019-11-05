import { createMuiTheme } from '@material-ui/core';
import { red, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2B86DD',
    },
    secondary: {
      main: amber.A400,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FAFAFA',
    },
  },
});

export default theme;
