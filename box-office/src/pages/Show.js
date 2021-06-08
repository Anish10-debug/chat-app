/*eslint-disable*/
//our main purpose in Show.js is to display the description when we press read more
//for this we will need to pull out the show.id from the url
//we will require custom hooks which are provided by react-router-dom

//useEffect allows us to hook into different component lifecyle events such as compDidmount..
//useEffect(()=>{},[]) expects two parameters
//a callback function and an array of dependencies
/*suppose useEffect(()=>{
console.log('Heyyyy')
},[input])*/
//so whenever we write somthing in the textbox or(state of input changes) then we will get 'Heyyyy'

/*suppose useEffect(()=>{
console.log('Heyyyy')

return ()=>{
    console.log(exit)       //useEffect also comes up with a cleanup callback 
                            //which will be fired when the component unmounts
                            //this is how useffect works
}
},[])*/

//useReducer is similar to useState
//reducer is used in case of complex objects(which contain nested objects or arrays.. etc)
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const reducer = (prevState, action) => {
  //this is like an update function in useState
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { show: action.show, error: null, isLoading: false }; //if fetch succesful then edit state
    }
    case 'FETCH_FAILED': {
      return { ...prevState, error: action.error, isLoading: false }; //we merge the previous object/state if fetch unsuccessfull
    }
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  // <Route exact path="/show/:id"></Route> is in Home.js (tvmaze has said to use :id for accessing id)
  const { id } = useParams(); //whatever is written after show/ in the url that will be stored in {id}

  const [state, dispatch] = useReducer(reducer, initialState); //alternative to useState

  //   const [show, setShow] = useState(null); //for storing the results of read more
  //   const [isloading, setIsLoading] = useState(true);
  //   const [error, setError] = useState(null);

  console.log('state', state);
  useEffect(() => {
    let isMounted = true; //check if component is mounted or not
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setTimeout(() => {
          if (isMounted) {
            dispatch({ type: 'FETCH_SUCCESS', show: results });
            // setShow(results);
            // setIsLoading(false);
          }
        }, 2000); //after 2 seconds the data will be displayed
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
          //   setError(err.message);
          //   setIsLoading(false);
        }
      });

    return () => {
      isMounted == false;
    };
  }, [id]); //here in the array of dependencies it is safe to put 'id' because it is not going to be changed by us

  if (isloading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Error occurred:{error}</div>;
  }
  return <div>This is show component</div>;
};

export default Show;
