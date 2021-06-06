import React from 'react';
import { Switch, Route } from 'react-router-dom';

// here whatever goes inside the Route will be rendered at that path
// this means that, the content of Route will be rendered only if
// the url matches the path given in Route
// for undefined paths we dont put exact path attribute
function App() {
  return (
    <Switch>
      <Route exact path="/">
        This is home page
      </Route>

      <Route exact path="/starred">
        This is starred
      </Route>

      <Route>This is 404</Route>
    </Switch>
  );
}

export default App;
