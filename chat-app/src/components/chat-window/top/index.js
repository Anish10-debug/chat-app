/*eslint-disable*/
import React from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { memo } from 'react';

const Top = () => {
  //NOTE: Provider trigger re-renders only if the context value is referentially changed.
  //In order to stop propagation, children of a context provider has to be either
  //created outside of the provider or memoized with React.memo.

  const name = useCurrentRoom(value => value.name);
  //what this does is... the component will not rerender when description gets updated

  return <div>{name}</div>;
};

export default memo(Top);
