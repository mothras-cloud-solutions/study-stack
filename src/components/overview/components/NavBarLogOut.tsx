// NavBar.tsx
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Signout from '../../SignOut/SignOut';

interface User {
  id: string;
  email: string;
}

interface NavBarProps {
  user: User | null;
}

const NavBarLogOut: React.FC<NavBarProps> = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <Fragment>
   <div className="box is-radiusless transparent-bg py-1">
      <nav className="navbar transparent-bg is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
              <b>Study Stack</b>
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  width="300.000000pt" height="316.000000pt" viewBox="0 0 300.000000 316.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,316.000000) scale(0.050000,-0.050000)" fill="#000000" stroke="none"> <path d="M2180 6042 c-280 -75 -771 -206 -1089 -290 -604 -160 -684 -192 -748 -298 -77 -128 -74 -154 94 -786 88 -329 184 -688 213 -798 29 -110 143 -537 252 -950 220 -834 222 -838 290 -902 26 -25 48 -59 48 -76 0 -18 18 -61 39 -96 45 -74 1603 -1624 1668 -1660 87 -48 186 -51 282 -8 120 53 2353 2275 2401 2388 85 205 43 272 -536 850 l-487 486 88 314 c176 634 171 640 -793 901 -367 100 -669 184 -671 187 -3 3 -43 150 -90 326 -160 600 -197 616 -961 412z m692 -112 c28 -43 51 -121 254 -880 550 -2046 598 -2245 564 -2317 -40 -85 -44 -87 -560 -223 -745 -197 -1255 -333 -1477 -394 -350 -95 -342 -104 -510 534 -67 253 -194 735 -283 1070 -89 336 -189 710 -221 832 -32 123 -85 323 -118 446 -81 294 -80 346 6 411 37 28 76 51 87 51 12 0 339 85 728 188 1548 412 1373 370 1444 346 31 -10 69 -39 86 -64z m680 -887 c120 -34 383 -106 586 -162 494 -135 525 -162 455 -404 -17 -59 -49 -174 -71 -257 -22 -82 -86 -321 -142 -530 -263 -973 -365 -1351 -470 -1740 -121 -449 -142 -501 -226 -532 -54 -21 -77 -15 -1494 373 -176 48 -367 98 -425 110 -142 30 -144 48 -9 78 103 23 922 238 1534 402 132 35 276 74 319 85 48 13 112 54 163 105 156 156 187 -4 -488 2517 -8 29 -2 36 20 27 17 -6 129 -39 248 -72z m1463 -1785 c472 -480 505 -522 466 -615 -12 -31 -533 -566 -1158 -1189 -1121 -1120 -1135 -1134 -1214 -1133 -75 0 -97 18 -449 361 -743 725 -1134 1118 -1111 1118 13 0 64 -13 112 -30 199 -66 1929 -530 1978 -530 72 0 220 79 265 140 33 46 600 2086 629 2265 16 98 -33 137 482 -387z"/> </g> </svg>
            </a>
              <a
                role="button"
                className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                aria-label="menu"
                aria-expanded="false"
                onClick={toggleMenu}
              >
                <span aria-hidden="false"></span>
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
                  <a className="navbar-item" >
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
                  </a>
                  <Signout />
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

export default NavBarLogOut;
