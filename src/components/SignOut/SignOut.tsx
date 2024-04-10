import React from 'react';
import { signOut } from '../../../firebase/firebase.ts';

function SignOut() {

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
}

export default SignOut;