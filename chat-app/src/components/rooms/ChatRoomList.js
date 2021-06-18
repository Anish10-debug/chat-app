/*eslint-disable*/
import React from 'react';
import { Nav } from 'rsuite';
import { useRooms } from '../../context/rooms.context';
import RoomItem from './RoomItem';
import { Loader } from 'rsuite';
import { Link, useLocation } from 'react-router-dom';

const ChatRoomList = ({ aboveElHeight }) => {
  const rooms = useRooms();
  const location = useLocation(); //used to know current url location

  //we will be styling the scroll bar and its height should be the size of full screen - size of dashboard
  //and create new chat room button

  //if there are no rooms then loader will be applied

  //if there are rooms then map the rooms with nav and link it to the chat room
  //activekey contain the url and if it matches the eventKey then animation will render
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}

      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item
            componentClass={Link}
            to={`/chat/${room.id}`}
            key={room.id}
            eventKey={`/chat/${room.id}`}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
};

export default ChatRoomList;
