/*eslint-disable*/
import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const Home = () => {
  const [input, setInput] = useState(''); //whatever we type in the textbox will be used as state
  const [results, setResult] = useState(null); //to store the result of the search
  const [searchOption, setsearchOption] = useState('shows'); // by default it will first display shows results

  const onInputChange = ev => {
    setInput(ev.target.value); //target.value will return the text we type
  };

  const onSearch = () => {
    //NOTE: .then is always associated with a callback function to get the value
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
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

  //this function is for changing the state of radio button
  //if shows is selected then value will be shows
  //if Actors is selected then value will be people
  const onSelectRadio = ev => {
    setsearchOption(ev.target.value);
  };

  console.log(searchOption);

  //function to display results
  const renderResults = () => {
    //if we search but the length of result is 0
    if (results && results.length === 0) {
      return <div>No results</div>;
    }

    //show.id is or show.name(its not a keyword) is found from the objects in the api
    //here we will check if results[0] contains show then..
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  };

  //value is stored as {input} which is the current state. On typing something the state will be changed
  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={keypressEnter}
        value={input}
      />

      <RadioInputsWrapper>
        <div>
          <label>
            Shows
            <input
              type="radio"
              id="shows"
              name="choice"
              value="shows"
              onChange={onSelectRadio}
            />
          </label>
        </div>

        <div>
          <label>
            Actor
            <input
              type="radio"
              id="actors"
              name="choice"
              value="people"
              onChange={onSelectRadio}
            />
          </label>
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
