/* eslint-disable*/
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
import ShowMainData from '../components/show/ShowMainData';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import Cast from '../components/show/Cast';
import { ShowPageWrapper, InfoBlock } from './Show.styled';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, error: null, show: action.show }; //if fetch succesful then edit state
    }

    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error }; //we merge the previous object/state if fetch unsuccessfull
    }

    default:
      return prevState;
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

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  ); //alternative to useState

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]); //here in the array of dependencies it is safe to put 'id' because it is not going to be changed by us

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Error occured: {error}</div>;
  }
  // If you remove if conidtions, main markup will experience show === null . It means ShowMainData will use null .
  // Your markup must be rendered only when show is NOT null. This is controlled by if conditions.

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
