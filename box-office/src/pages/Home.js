/*eslint-disable*/
import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState(''); //whatever we type in the textbox will be used as state
  const [results, setResult] = useState(null); //to store the result

  const onInputChange = ev => {
    setInput(ev.target.value); //target.value will return the text we type
  };

  const onSearch = () => {
    //NOTE: .then is always associated with a callback function to get the value
    apiGet(`/search/shows?q=${input}`);
    fetch(`http://api.tvmaze.com/search/shows?q=${input}`).then(result => {
      setResult(result);
      console.log(result);
    });
  };

  //onKeyDown is an event which is means on key press
  //every key on the keyboard has a key code
  //for Enter it is 13
  const keypressEnter = ev => {
    if (ev.keyCode == 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    //if we search but the length of result is 0
    if (results && results.length === 0) {
      return <div>No results</div>;
    }

    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div id={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }

    return null;
  };

  //value is stored as {input} which is the current state. On typing something the state will be changed
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={keypressEnter}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
