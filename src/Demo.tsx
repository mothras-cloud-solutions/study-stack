import React, { useEffect, useState, Fragment } from 'react';
import Register from './components/Register/Register.tsx';
import Login from './components/Login/Login.tsx';
import SignOut from './components/SignOut/SignOut.tsx';
import { onAuthStateChange } from '../firebase/firebase.ts';
import { User } from 'firebase/auth';
import Skeleton from './components/Skeleton';
import DeckCollection from './components/inspectCollection/DeckCollection';
import StudyPageTest from './components/learnCollection/testcollection';
import NavBar from './components/overview/components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Overview from './components/overview/index';
import CreateDeck from './components/Skeleton/components/CreateDeck';

function Demo() {
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
      console.log('User UID:', uid);
      setUid(uid);
    }
  }, [user]);

  return (
    <Fragment>
      {/* <Routes location="">
        <Route path="" element={<Overview />} />
      </Routes> */}
      {user ? (
        <>
          <NavBar />
          {/* <Overview /> */}
        </>
      ) : (
        <Fragment>
          <Register />
          <Login />
        </Fragment>
      )}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Overview />} />
        <Route path="/learn" element={<StudyPageTest />} />
        <Route path="/create" element={<CreateDeck />} />
        {/* <Route path="/collections" element={<DeckCollection uid={uid}/>} /> */}
      </Routes>
    </Fragment>
  )
}

export default Demo;
