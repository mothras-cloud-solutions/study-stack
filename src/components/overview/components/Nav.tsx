// NavBar.tsx
import React, { useState } from 'react';

interface User {
  // Define the type for the user object
  // We will modify this according to the actual structure of our user object
  id: string;
  email: string;
  // Add more properties as needed
}

interface NavBarProps {
  user: User | null; // Specify the type for the user prop
  onLoginLinkClick: () => void;
  onHomeLinkClick: () => void;
  onSignOutClick: () => void;
  onCreateLinkClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ user, onLoginLinkClick, onHomeLinkClick, onSignOutClick, onCreateLinkClick }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleSignOut = async () => {
  };

  return (
    <div className="box is-radiusless transparent-bg py-1">
      <nav className="navbar transparent-bg" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
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
              <a className="navbar-item" onClick={onHomeLinkClick}>
                Home
              </a>
              <a className="navbar-item">
                <span className="navbar-item-separator"></span>
              </a>

              {user ? (
                // If user is signed in, show additional links
                <>
                  <a className="navbar-item" href="#">
                    Decks
                  </a>
                  <a className="navbar-item" href="#">
                    Study
                  </a>
                  <a className="navbar-item" onClick={onCreateLinkClick} href="#">
                    Create
                  </a>
                  <a className="navbar-item" onClick={handleSignOut}>Sign Out</a>
                  {/* Add more links as needed */}
                </>
              ) : (
                // If user is not signed in, show login link
                <a className="navbar-item" onClick={onLoginLinkClick}>Sign In</a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
