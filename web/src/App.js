import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import { RequireAuth } from './auth';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import SignIn from './pages/Signin';
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
              <Dashboard />
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
