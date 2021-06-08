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
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  // <Route exact path="/show/:id"></Route> is in Home.js (tvmaze has said to use :id for accessing id)
  const { id } = useParams(); //whatever is written after show/ in the url that will be stored in {id}
  const [show, setShow] = useState(null); //for storing the results of read more
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isMounted = true; //check if component is mounted or not
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setTimeout(() => {
          if (isMounted) {
            setShow(results);
            setIsLoading(false);
          }
        }, 2000); //after 2 seconds the data will be displayed
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
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
