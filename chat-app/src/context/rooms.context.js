/*eslint-disable*/
import { createContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transfromToArrWithId } from '../misc/helpers';

const RoomsContext = createContext();
export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  useEffect(() => {
    const roomListRef = database.ref('rooms');

    roomListRef.on('value', snap => {
      const roomData = transfromToArrWithId(snap.val());
      console.log('Room Data', roomData);
    });

    return () => {
      roomListRef.off();
    };
  });
  return (
    <RoomsContext.Provider value="hello">{children}</RoomsContext.Provider>
  );
};
