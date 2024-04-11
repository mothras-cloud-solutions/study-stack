import React, { useEffect, useState, Fragment } from 'react';
import Register from './components/Register/Register.tsx';
import Login from './components/Login/Login.tsx';
// import SignOut from './components/SignOut/SignOut.tsx';
import { onAuthStateChange } from '../firebase/firebase.ts';
import { User } from 'firebase/auth';
import HomePage from './components/Skeleton/components/HomePage';
import NavBar from './components/Skeleton/components/NavBar';
import Footer from './components/Skeleton/components/Footer';
import CreateDeck from './components/Skeleton/components/CreateEditDeck';
// import Skeleton from './components/Skeleton';
import DeckCollection from './components/inspectCollection/DeckCollection';
import StudyPageTest from './components/learnCollection/testcollection';
import NavBarLogIn from './components/overview/components/NavBarLogIn';
import NavBarLogOut from './components/overview/components/NavBarLogOut';
import { Routes, Route } from 'react-router-dom';
import Overview from './components/overview/index';

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
      console.log(uid);
      setUid(uid);
    }
  }, [user]);

  return (
    <Fragment>
      {user ? (
        <>
          {/* <CreateDeck uid={uid} /> */}
        {/* <SignOut /> */}
        {/* <DeckCollection uid={uid} /> */}
        {/* <StudyPageTest /> */}
          <NavBarLogOut />
        </>
      ) : (
        <Fragment>
          <NavBarLogIn />
        </Fragment>
      )}
    <section className="section">
    <div className="container">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Overview />} />
        <Route path="/learn" element={<StudyPageTest />} />
        <Route path="/create" element={<CreateDeck uid={uid} />} />
        <Route path="/collections" element={<DeckCollection uid={uid} />} />
      </Routes>
      </div>
      </section>
    </Fragment>
  )
}

export default App;
