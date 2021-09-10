import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Home from '../pages/home';
import ControView from '../pages/control';
import history from './history';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/control" component={ControView} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;