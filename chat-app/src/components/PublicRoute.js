/*eslint-disable*/
import React from 'react';
import { Container, Loader } from 'rsuite';
import { Redirect } from 'react-router';
import { Route } from 'react-router';
import { useProfile } from '../context/profile.context';

const PublicRoute = ({ children, ...routeProps }) => {
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

  if (profile && !isLoading) {
    //if we have a profile
    return <Redirect to="/" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
