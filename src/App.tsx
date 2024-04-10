import React, { useEffect, useState, Fragment } from 'react';
import Register from './components/Register/Register.tsx';
import Login from './components/Login/Login.tsx';
import SignOut from './components/SignOut/SignOut.tsx';
import { onAuthStateChange } from '../firebase/firebase.ts';
import { User } from 'firebase/auth';
import Skeleton from './components/Skeleton';
import DeckCollection from './components/inspectCollection/DeckCollection';
import StudyPageTest from './components/learnCollection/testcollection';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (user) {
     const uid = user.uid;
      setUid(uid);
    }
  }, [user]);

  return (
    <Fragment>

      {user ? (
        <>
        <SignOut />
        <DeckCollection uid={uid} />
        <StudyPageTest />
        </>
      ) : (
        <Fragment>
          <Register />
          <Login />
        </Fragment>
      )}

    </Fragment>
  )
}

export default App;