/*eslint-disable*/
import React from 'react';
import { Container, Loader } from 'rsuite';
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';

const PrivateRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    //if our content is loading and we still dont have any profile data
    return (
      <Container>
        <Loader
          center
          vertical
          size="md"
          content="Loading"
          speed="slow"
        ></Loader>
      </Container>
    );
  }

  if (!isLoading && !profile) {
    //if we dont have a profile
    return <Redirect to="/signin" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};
//here routeprops is the path given in privateroute (app.js) and children prop is the
//text within the private route
export default PrivateRoute;
