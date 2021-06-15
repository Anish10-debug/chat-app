/*eslint-disable*/
import { useCallback, useState, useEffect } from 'react';

export function useModalState(defaultValue = false) {
  //this will be set to false if parameter is undefined while calling
  const [isOpen, setIsOpen] = useState(defaultValue);

  //this is a function in which callback will
  //run only if one of the dependencies is changed
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}

// usage
// const is992px = useMediaQuery('(max-width: 992px)')
//this function is for the sidebar

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};
