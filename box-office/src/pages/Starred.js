/*eslint-disable*/
import React from 'react';
import { useState, useEffect } from 'react';
import { useShows } from '../misc/custom-hooks';
import { apiGet } from '../misc/config';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';

const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      //if starred shows are defined
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));
      //apiGet returns array of promises which we will resolve
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show }))) //in Showgrid.js we have data.map{show} that's why
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {/* conditional rendering */}
      {isLoading && <div> Shows are still loading</div>}
      {error && <div>error occured: {error}</div>}
      {!isLoading && !shows && <div>No shows were starred</div>}
      {!isLoading && !error & shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
