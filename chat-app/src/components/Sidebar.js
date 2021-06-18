/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import DashboardToggle from './dashboard/DashboardToggle';
import { Divider } from 'rsuite';
import ChatRoomList from './rooms/ChatRoomList';

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight); //this will give us the height of dashboard + createnewchatroom button
    }
  }, [topSidebarRef]);
  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join conversation</Divider>
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
