import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navs from './components/Navs';
import Home from './pages/Home';
import Starred from './pages/Starred';

// here whatever goes inside the Route will be rendered at that path
// this means that, the content of Route will be rendered only if
// the url matches the path given in Route
// for undefined paths we dont put exact path attribute

function App() {
  return (
    <div>
      <Navs />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/starred">
          <Starred />
        </Route>

        <Route>This is 404 NOT FOUND</Route>
      </Switch>
    </div>
  );
}

export default App;
