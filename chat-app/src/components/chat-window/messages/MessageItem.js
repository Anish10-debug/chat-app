/*eslint-disable*/
import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import PresenceDot from '../../PresenceDot';

const MessageItem = ({ message }) => {
  const { author, createdAt, text } = message;
  return (
    <ul>
      <li className="padded mb-1 ">
        <div className="d-flex align-items-center font-bolder mb-1">
          <PresenceDot uid={author.uid} />
          <ProfileAvatar
            src={author.avatar}
            name={author.name}
            className="ml-1"
            size="xs"
          />

          <ProfileInfoBtnModal profile={author} />
          <TimeAgo
            datetime={createdAt}
            className="font-normal text-black-45 ml-2"
          />
        </div>

        <div>
          <span className="word-break-all">{text}</span>
        </div>
      </li>
    </ul>
  );
};

export default MessageItem;
