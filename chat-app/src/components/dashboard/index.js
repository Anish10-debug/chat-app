/*eslint-disable*/
import React from 'react';
import { Button, Drawer, Divider, Alert } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import AvatarUploadBtn from './AvatarUploadBtn';
import EditableInput from './EditableInput';

//Here we will style the drawer and also provide options to change profile name and sign out
const Dashboard = ({ onSignout }) => {
  const { profile } = useProfile();

  const onSave = async newData => {
    //console.log(newData);
    const userNicknameRef = database
      .ref(`profiles/${profile.uid}`)
      .child('name');

    try {
      await userNicknameRef.set(newData);
      Alert.success('Nickname has been updated', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

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
        <AvatarUploadBtn />
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
