/*eslint-disable*/
import { useCallback, useState } from 'react';

export function useModalState(defaultValue = false) {
  //this will be set to false if parameter is undefined while calling
  const [isOpen, setIsOpen] = useState(defaultValue);

  //this is a function in which callback will
  //run only if one of the dependencies is changed
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}
