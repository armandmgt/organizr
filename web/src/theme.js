import { createMuiTheme } from '@material-ui/core';
import { amber, green, red } from '@material-ui/core/colors';
import update from 'immutability-helper';

const theme = {
  palette: {
    primary: {
      main: '#2B86DD',
    },
    secondary: amber,
    error: red,
    valid: green,
    background: {
      default: '#FAFAFA',
    },
  },
};

export default createMuiTheme(theme);

export const successTheme = createMuiTheme(
  update(theme, {
    palette: {
      secondary: { $set: { main: '#388e3c' } },
    },
  })
);
