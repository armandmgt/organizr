import 'typeface-roboto';

import MomentUtils from '@date-io/moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import client from './apollo';
import App from './App';
import history from './history';
import * as serviceWorker from './serviceWorker';
import theme from './theme';

ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <Router history={history}>
            <App />
          </Router>
        </ApolloProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
if (module.hot) module.hot.accept();
