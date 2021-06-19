/*eslint-disable*/
import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { Switch, Route, useRouteMatch } from 'react-router';
import { RoomsProvider } from '../../context/rooms.context';
import Chat from './Chat';
import { useMediaQuery } from '../../misc/custom-hooks';

const Home = () => {
  //we want to hide the chat window on small devices when we are exactly on the homepage
  //just like the difference between whatsapp and whatsapp web

  //if you are using phone then after selecting the chat
  //you wont see the sidebar
  //on desktop we can see both
  const isDesktop = useMediaQuery('(min-width: 992px)');

  const { isExact } = useRouteMatch(); //this will return true when the url will be just the homepage
  //i.e. when no chat is selected

  const canRenderSidebar = isDesktop || isExact; //if it is desktop or exact path, only then sidebar will be rendered
  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRenderSidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}

          <Switch>
            <Route exact path="/chat/:chatId">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            <Route>
              {isExact && (
                <Col xs={24} md={16} className="h-100">
                  <h6 className="text-center mt-page">Please Select a chat</h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
