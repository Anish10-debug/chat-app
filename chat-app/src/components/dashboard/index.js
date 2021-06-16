/*eslint-disable*/
import React from 'react';
import { Icon, Button, Drawer, Divider } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from './EditableInput';

//Here we will style the drawer and also provide options to change profile name and sign out
const Dashboard = ({ onSignout }) => {
  const onSave = async newData => {
    console.log(newData);
  };
  const { profile } = useProfile();
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3> Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignout}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
