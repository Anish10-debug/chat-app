/*eslint-disable*/
import React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

//the problem with context api is that, with every change in the value of context
// the entire component will rerender. And we don't want that
//in Chat.js we used useRoom(). Any update in any room will lead to rerender of entire component
//even though the update hasnt been related to that particular room

//therefore we will prvide a new context current-room.context and we will pass currently accessed room data
//for this context we use useContextSelector

const CurrentRoomContext = createContext();
export const CurrentRoomProvider = ({ children, data }) => {
  return (
    <CurrentRoomContext.Provider value={data}>
      {children}
    </CurrentRoomContext.Provider>
  );
};

export const useCurrentRoom = selector =>
  useContextSelector(CurrentRoomContext, selector);
