import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import { RequireAuth } from './auth';
import Layout from './components/Layout';
import Home from './pages/home';
import Register from './pages/register';
import SignIn from './pages/signin';
import Todos from './pages/Todos';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <RequireAuth>
            <Layout title="Home">
              <Home />
            </Layout>
          </RequireAuth>
        </Route>
        <Route path="/todos">
          <RequireAuth>
            <Layout title="Todos">
              <Todos />
            </Layout>
          </RequireAuth>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
