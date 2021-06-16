/*eslint-disable*/
import React, { useCallback, useState } from 'react';
import { Icon, Input, InputGroup, Button, Alert } from 'rsuite';
const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = 'Write your value',
  emptyMsg = 'Input is empty',
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue); //allow the user to change the value
  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const [isEditable, setIsEditable] = useState(false); //input will be disabled when isEditable id false
  //close and edit2 are the names of the icon from the rsuite library

  const onEditClick = useCallback(() => {
    setIsEditable(p => !p); //change to true and then we can edit
    setInput(initialValue); //if we wish to cancel editing then our current profile name will be displayed
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim(); //to remove unnecessary spaces on our editted value
    if (trimmed === '') {
      Alert.info(emptyMsg, 4000); //if the input box is empty and we try to save
    }

    if (trimmed != initialValue) {
      await onSave(trimmed); //if the new name and previous name dont match i.e if there is some change
      //we pass this trimmed value to onSave function
    }

    setIsEditable(false);
  };
  return (
    <div>
      {label}{' '}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? 'close' : 'edit2'} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
