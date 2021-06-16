/*eslint-disable*/
import React, { useCallback } from 'react';
import Dashboard from '.';
import { Icon, Button, Drawer, Alert } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery('max-width:992px'); //this will return true or false
  //if it is mobile then isMobile will be set to true the size of our drawer will be full
  //if it is desktop then our drawer will be static

  const onSignout = useCallback(() => {
    auth.signOut();

    Alert.info('Signed out', 4000);
    close();
  }, [close]);
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard"> Dashboard</Icon>
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignout={onSignout} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
