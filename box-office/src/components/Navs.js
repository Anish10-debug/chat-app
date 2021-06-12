/*eslint-disable*/
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'; // this is similar to hyperlink
import { NavList, LinkStyled } from './Navs.styled';

const LINKS = [
  //here an array of objects is created which contains the link
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => {
  const location = useLocation(); //this is another react hook that will tell us the current path
  //which will change if we go to another page
  //the current path is stored in the pathname element of the object
  //so in our navs.styled we have active class written
  //depending on the current page (home/starred) the word will be highlighted if we are on home/starred
  console.log('location', location);
  return (
    <div>
      <div>
        <NavList>
          {LINKS.map(item => (
            <li key={item.to}>
              <LinkStyled
                to={item.to}
                className={item.to == location.pathname ? 'active' : ''}
              >
                {item.text}
              </LinkStyled>
            </li>
          ))}
        </NavList>
      </div>
    </div>
  );
};

export default Navs;
