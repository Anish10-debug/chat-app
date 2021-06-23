/*eslint-disable*/
import React from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { memo } from 'react';
import { useMediaQuery } from '../../../misc/custom-hooks';
import { Icon, ButtonToolbar } from 'rsuite';
import { Link } from 'react-router-dom';
import RoomInfoBtnModal from './RoomInfoBtnModal';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';

const Top = () => {
  //NOTE: Provider trigger re-renders only if the context value is referentially changed.
  //In order to stop propagation, children of a context provider has to be either
  //created outside of the provider or memoized with React.memo.

  const name = useCurrentRoom(value => value.name);
  //what this does is... the component will not rerender when description gets updated

  const isAdmin = useCurrentRoom(value => value.isAdmin);
  const isMobile = useMediaQuery('(max-width: 992px)');
  //if the user is an admin only then EditRoomBtnModal will be able to see option of edit room
  //--------------------------------------------------------------------------------------------------
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear"> {name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">
          {isAdmin && <EditRoomBtnDrawer />}
        </ButtonToolbar>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};

export default memo(Top);
