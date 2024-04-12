import React from 'react';
import { signOut } from '../../../firebase/firebase.ts';
import { useNavigate } from 'react-router-dom';

function SignOut() {

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('User signed out successfully');
      navigate('/home');
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <button className="signout button is-link" onClick={handleSignOut}>Sign Out</button>
  );
}

export default SignOut;