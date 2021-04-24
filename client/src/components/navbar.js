import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div>
        <ul>
          <li>
            <Link to='/'>User Traker</Link>
          </li>
          <li>
            <Link to='/user'>Create User</Link>
          </li>
          <li>
            <Link to='/create'>Update Account Log</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
