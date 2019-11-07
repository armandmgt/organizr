import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

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
        <Route path="/signin" component={SignIn} />
        <Route path="/register" component={Register} />
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
      </Switch>
    </Router>
  );
}

export default App;
