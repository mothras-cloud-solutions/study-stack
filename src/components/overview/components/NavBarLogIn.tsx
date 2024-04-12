// NavBar.tsx
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Register from '../../Register/Register';
import Login from '../../Login/Login';


interface User {
  id: string;
  email: string;
}

interface NavBarProps {
  user: User | null;
}

const NavBarLogIn: React.FC<NavBarProps> = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <Fragment>
      <div className="box is-radiusless transparent-bg py-1">
        <nav className="navbar transparent-bg" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="home">
                <b>Study Stack</b>
              </a>
              <a
                role="button"
                className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                aria-label="menu"
                aria-expanded="false"
                onClick={toggleMenu}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
              <div className="navbar-end">
                <a className="navbar-item">
                  <Link to="/home">
                    Home
                  </Link>
                </a>
                <a className="navbar-item">
                  <span className="navbar-item-separator"></span>
                </a>

                {/* {user ? ( */}
                {/* // If user is signed in, show additional links */}
                <>
                  {/* <a className="navbar-item" >
                    <Link to="/collections">
                      Collections
                    </Link>
                  </a>
                  <a className="navbar-item" href="#">
                    <Link to="/learn">
                      Study
                    </Link>
                  </a>
                  <a className="navbar-item" href="#">
                    <Link to="/create">
                      Create
                    </Link>
                  </a> */}
                  <a className="navbar-item" href="#">
                    <Link to="/login">
                      Login
                    </Link>
                  </a>
                  <a className="navbar-item" href="#">
                    <Link to="/register">
                      Register
                    </Link>
                  </a>
                  {/* <a className="navbar-item">Sign In</a> */}
                  {/* Add more links as needed */}
                </>
                {/* // ) : ( */}
                {/* // If user is not signed in, show login link */}

                {/* )} */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </Fragment>

  );
};

export default NavBarLogIn;
