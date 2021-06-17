/*eslint-disable*/
import React, { useState, useRef } from 'react';
import { Alert, Modal, Button } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useModalState } from '../../misc/custom-hooks';
import { storage, database } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import ProfileAvatar from '../ProfileAvatar';

const fileInputTypes = '.png, .jpeg, .jpg,';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpg'];
const isValidFile = file => acceptedFileTypes.includes(file.type); //this will return either true or false

const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob); //if blob exists
      } else {
        reject(new Error('File processing error'));
      }
    });
  });
};

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();
  const [image, setImage] = useState(null);
  const { profile } = useProfile();
  const avatarEditorRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const onFileInputChange = ev => {
    const currFiles = ev.target.files; //returns array

    if (currFiles.length === 1) {
      //if only 1 file is selected
      const file = currFiles[0]; //grab first element from array

      if (isValidFile(file)) {
        setImage(file);
        open();
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 4000);
      }
    }
  };

  //***** UPLOAD FUNCTION *****
  const onUploadClick = async () => {
    //first we need to get access to the editted pic

    const canvas = avatarEditorRef.current.getImageScaledToCanvas(); //we get the element from thr reference
    //but we cant to anything with it
    //to upload it to firebase we need some suitable format
    //we will convert it into a blob file which is a file of binary digits

    // canvas.toBlob(); it only accepts callbacks. To convert this callback method to promise getBlob() is written
    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child('avatar'); //avatar is going to be a file name 'avatar'

      //this will create a folder named "profile" and then uid/avatar in which the image will be stored
      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age${3600 * 24 * 3}`,
        //.put method has two arguements where the 2nd argument is the metadata
        //to cache images in the browser cacheControl is used which comes with firebase
        //max-age is 3 days which is converted into seconds
      });
      const downloadURL = await uploadAvatarResult.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`profiles/${profile.uid}`)
        .child('avatar');

      userAvatarRef.set(downloadURL); //the link of avatar will be uploaded to database
      setIsLoading(false);
      Alert.info('Avatar has been uploaded', 4000);
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  //-------------------------------------------------------------------------------------------------------------
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="d-flex justify-center align-items-center h-100">
              {image && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={image}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
