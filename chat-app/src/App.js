/*eslint-disable*/
import React from 'react';
import './styles/main.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import SignIn from './pages/SignIn';
import { Switch } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

//privateRoute is done so that only signed up members can access the Homepage
function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute path="/">Home</PrivateRoute>
    </Switch>
  );
}

export default App;
