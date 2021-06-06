/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom'; // this is similar to hyperlink

const LINKS = [
  //here an array of objects is created which contains the link
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => {
  return (
    <div>
      <div>
        <ul>
          {LINKS.map(item => (
            <li key={item.to}>
              <Link to={item.to}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navs;
