import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/home';
import SignIn from './pages/signin';
import Todos from './pages/Todos';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route exact path="/">
          <Layout title="Home">
            <Home />
          </Layout>
        </Route>
        <Route path="/todos">
          <Layout title="Todos">
            <Todos />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
