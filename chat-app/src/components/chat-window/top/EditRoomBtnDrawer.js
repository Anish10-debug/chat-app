/*eslint-disable*/
import React from 'react';
import { Alert, Button, Drawer } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';
import EditableInput from '../../dashboard/EditableInput';
import { memo } from 'react';
import { database } from '../../../misc/firebase';
import { useParams } from 'react-router';

const EditRoomBtnDrawer = () => {
  const { chatId } = useParams();
  const { isOpen, open, close } = useModalState();
  const name = useCurrentRoom(value => value.name);
  const description = useCurrentRoom(value => value.description);
  const isMobile = useMediaQuery('(max-width:992px)');

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success('Successfully updated', 4000);
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };

  const onNameSave = newName => {
    updateData('name', newName);
  };

  const onDescriptionSave = newDesc => {
    updateData('description', newDesc);
  };
  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        Edit Room
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit room</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name cannot be empty"
            wrapperClassName="mt-3"
          />

          <EditableInput
            componentClass="text-area"
            rows={5}
            initialValue={description}
            onSave={onDescriptionSave}
            label={<h6 className="mb-2">Description</h6>}
            emptyMsg="Description cannot be empty"
          />
        </Drawer.Body>

        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
