import React from 'react';
import { Link, history } from 'umi';

export default () => {
  return (
    <div>
      hello user
      <ul>
        <li>
          <Link to="/user/1">1</Link>
        </li>
        <li>
          <Link to="/user/1">2</Link>
        </li>
        <li onClick={() => history.push('/user/3')}>3</li>
      </ul>
    </div>
  );
};
