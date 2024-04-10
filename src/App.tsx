import React, { useEffect, useState, Fragment } from 'react';
import Register from './components/Register/Register.tsx';
import Login from './components/Login/Login.tsx';
import SignOut from './components/SignOut/SignOut.tsx';
import { onAuthStateChange } from '../firebase/firebase.ts';
import { User } from 'firebase/auth';
import HomePage from './components/Skeleton/components/HomePage';
import NavBar from './components/Skeleton/components/NavBar';
import Footer from './components/Skeleton/components/Footer';
import CreateDeck from './components/Skeleton/components/CreateDeck';
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
      <NavBar />
    <section className="section">
    <div className="container">

      {user ? (
        <>
          <CreateDeck uid={uid}/>
        {/* <SignOut />
        <DeckCollection uid={uid} />
        <StudyPageTest /> */}
        </>
      ) : (
        <Fragment>
          {/* <CreateDeck /> */}
          <HomePage />
          <Register />
          <Login />
        </Fragment>
      )}
      </div>
      </section>
      <Footer />
    </Fragment>
  )
}

export default App;