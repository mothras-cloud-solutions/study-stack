import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

interface User {
  email: string;
  // Add more user properties if needed
}

interface AuthFormsProps {
  onCancelClick: () => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ onCancelClick }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);


  const handleSignInClick = () => {
    setShowLoginForm(true);
  };

  const handleSignUpClick = () => {
    setShowLoginForm(false); // Set to false to display the registration form
  };

  const handleSignOut = async () => {

  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {user ? (
            <div className="columns is-centered is-vcentered fullPageCenteredComponent">
              <div className="column is-two-fifths">
                <p>Signed in as: </p>
                <button className="button is-link is-outlined" onClick={handleSignOut}>Sign Out</button>
              </div>
            </div>
          ) : (
            <>
              {showLoginForm ? (
                <LoginForm onSignUpClick={handleSignUpClick} onCancelClick={onCancelClick}/>
              ) : (
                <RegistrationForm onSignInClick={handleSignInClick} onCancelClick={onCancelClick}/>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AuthForms;
