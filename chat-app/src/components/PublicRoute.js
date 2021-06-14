/*eslint-disable*/
import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = false;
  if (profile) {
    //if we dont have a profile
    return <Redirect to="/" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
