/*eslint-disable*/
import React from 'react';
import ShowCard from './ShowCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';

//we will pass the data as a prop from Home.js
//data will contain an object 'show' which is found from the api
//we will map show attributes to data and then pass them as props in ShowCard
const ShowGrid = ({ data }) => {
  return (
    <div>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
          summary={show.summary}
        />
      ))}
    </div>
  );
};

export default ShowGrid;
