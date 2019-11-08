import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import SignIn from './pages/Signin';
import Todos from './pages/Todos';

const routes = [
  { path: '/signin', component: SignIn },
  { path: '/register', component: Register },
  { path: '/', exact: true, layout: true, title: 'Home', component: Dashboard },
  { path: '/todos', layout: true, title: 'Todos', component: Todos },
  { path: '*', component: Redirect, props: { to: '/signin' } },
];

function App() {
  return (
    <Switch>
      {routes.map(
        ({ path, exact, component: Component, props, layout, title }) => (
          <Route key={path} path={path} exact={exact}>
            {layout ? (
              <Layout title={title}>
                <Component {...props} />
              </Layout>
            ) : (
              <Component {...props} />
            )}
          </Route>
        )
      )}
    </Switch>
  );
}

export default App;
