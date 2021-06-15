/*eslint-disable*/
import React from 'react';
import Dashboard from '.';
import { Icon, Button, Drawer } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard"> Dashboard</Icon>
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
