/*eslint-disable*/
import React from 'react';
import { Avatar } from 'rsuite';
import { getNameInitials } from '../misc/helpers';

const ProfileAvatar = ({ name, ...avatarProps }) => {
  //if we dont have an image as our avatar then we will display name initials
  return (
    <Avatar circle {...avatarProps}>
      {getNameInitials(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
