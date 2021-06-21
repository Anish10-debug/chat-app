/*eslint-disable*/
import React, { useCallback, useState } from 'react';
import { InputGroup, Input, Icon, Alert } from 'rsuite';
import firebase from 'firebase/app';
import { useParams } from 'react-router';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}), //if avatar of the user exists then we will add avatar object
      //to assembleMessage object. Otherwise, we will attach empty object
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP, //date of message sent
  };
}

const Bottom = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();
  const { chatId } = useParams();

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim() === '') {
      //if its an empty message
      return;
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {}; //this is created for updating two documents together in the database

    const messageId = database.ref('messages').push().key; //here we create a new document in the database
    //named 'messages' and generate a unique id with .key method

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };

    setIsLoading(true);

    try {
      await database.ref().update(updates); //databse will be updated
      setInput(''); //textbox will be empty after sending message
      setIsLoading(false);
    } catch (err) {
      Alert.error(err.message, 4000);
      setIsLoading(false);
    }
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault(); //to prevent any previously defined functionality for pressing enter
      onSendClick(); //if you press enter then message will be sent
    }
  };

  //-------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new message..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />

        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;
