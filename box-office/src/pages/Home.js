/*eslint-disable*/
import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  const [input, setInput] = useState(''); //whatever we type in the textbox will be used as state

  const onInputChange = ev => {
    setInput(ev.target.value); //target.value will return the text we type
  };

  const onSearch = () => {
    //https://api.tvmaze.com/search/shows?q=men
    //fetch allows us to fetch the remote data
    //fetch always returns a promise therefore we need to resolve it to get the actual value
    //whatever is returned that should be converted to json and from the json we use another .then to get the result
    //NOTE: .then is always associated with a callback function to get the value
    fetch(`http://api.tvmaze.com/search/shows?q=${input}`)
      .then(returnedVal => returnedVal.json())
      .then(result => {
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
    </MainPageLayout>
  );
};

export default Home;
