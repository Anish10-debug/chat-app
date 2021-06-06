/*eslint-disable*/
// this page is created because we dont want same layout for all pages
import React from 'react';
import Navs from './Navs';
import Title from './Title';

// whatever is enclosed with <MainPageLayout> in Home.js is passed as a prop
const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title />
      <Navs />
      {children}
    </div>
  );
};

export default MainPageLayout;
