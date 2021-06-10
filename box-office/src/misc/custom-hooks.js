/*eslint-disable*/
//this piece of code contributes in the functionality of 'Starred'.
//when you click on 'Star' on any show then it should be stored in the local storage
//inspect -> application->left side tab local storage
//when you click on localstorage you see key and value
//key will have show id
//so to fetch the show id starred by the user, we use custom hooks
import { useReducer, useEffect } from 'react';

//useReducer also comes with a third argument which is the initializer function to computate initialState
// whatever is returned from it will be set as the initialState regardless of what we pass in the second argument

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      //two cases- Starring and Unstarring
      return [...prevState, action.showId];
    }
    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }
    default:
      return prevState;
  }
}
function usePersistedReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse() : initial;
    //we will check whether we got anything as a key in the persisted.
    //if yes then we will parse it because we want to store an object not string
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]); //anywhow key will not be changing

  return [state, dispatch];
}

export function useShows(key = 'Shows') {
  return usePersistedReducer(showsReducer, [], key);
}
