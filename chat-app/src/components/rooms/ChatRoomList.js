/*eslint-disable*/
import React from 'react';
import { Nav } from 'rsuite';
import RoomItem from './RoomItem';

const ChatRoomList = ({ aboveElHeight }) => {
  //we will be styling the scroll bar and its height should be the size of full screen - size of dashboard
  //and create new chat room button
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px)`,
      }}
    >
      <Nav.Item>
        <RoomItem />
      </Nav.Item>
    </Nav>
  );
};

export default ChatRoomList;
