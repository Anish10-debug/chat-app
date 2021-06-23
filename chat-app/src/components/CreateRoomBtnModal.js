/*eslint-disable*/
import React, { useState, useCallback, useRef } from 'react';
import {
  Button,
  Icon,
  Modal,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Schema,
  Alert,
} from 'rsuite';
import firebase from 'firebase/app';
import { useModalState } from '../misc/custom-hooks';
import { database } from '../misc/firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
  //here we are defining a schema for our form
  //constraints for our form are as follows
  name: StringType().isRequired('Chat name is required'),
  description: StringType().isRequired('Description is required'),
});

const INITIAL_FORM = {
  name: '',
  description: '',
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    //the thing about using onChange on rsuit components is that
    //it gives us the value of the entire form (not the input) directly as an argument
    //no need to use 'ev' for accessing the value
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      //if not matching the schema
      //.current.check will validate our form value based on the defined schema and returns true/false
      Alert.info('Returned', 4000);
      return;
    }
    setIsLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true, //when we create a room then we will be the admins
      },
    };

    try {
      await database.ref('rooms').push(newRoomData);

      Alert.success(`${formValue.name} has been created`, 4000);
      setIsLoading(false);
      setFormValue(INITIAL_FORM); //after entering the data and submitting, reset it
      close(); //close the modal window
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  //---------------------------------------------------------------------------------------------
  return (
    <div className="mt-2">
      <Button block color="green" onClick={open}>
        <Icon icon="creative"> Create new chat room</Icon>
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name..." />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter chat room description..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
