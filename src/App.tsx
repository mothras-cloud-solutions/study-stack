import React, { useEffect, useState, Fragment } from 'react';
import Register from './components/Register/Register.tsx';
import Login from './components/Login/Login.tsx';
import axios from 'axios';
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
import StudyCards from './components/learnCollection/StudyCards';
import { response } from 'express';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [currentDeck, setCurrentDeck] = useState<Object | null>(null);
  const [currentCards, setCurrentCards] = useState<Array | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((u) => {
      setUser(u);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (currentDeck !== null) {
      axios.get(`/api/flashcards/collection_id/${currentDeck.id}`)
        .then((response) => {
          setCurrentCards(response.data);
        })
        .catch((error) => {
          console.error('Error fetching flashcards:', error);
        });
    }
  }, [currentDeck]);

  useEffect(() => {
    if (user) {
      const uid = user.uid;
      setUid(uid);
    } else {
      setUid(null);
    }
  }, [user]);

  useEffect(() => {
    console.log("uid, ", uid)
  }, [uid])

  function changeDeck(deck: Array) {
    setCurrentDeck(deck);
  }

  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={user ? (
            <>
              <NavBarLogOut path="/home" />
              <Overview />
              <Footer />
            </>
          ) : (
            <Fragment>
              <NavBarLogIn currentCards={currentCards} />
              <HomePage />
              <Footer />
            </Fragment>
          )}
        />
        <Route path='/' element={user ? <NavBarLogOut /> : <NavBarLogIn currentCards={currentCards} />}>
          <Route path="home" element={<Overview />} />
          <Route path="learn" element={<StudyCards prop={currentCards} />} />
          <Route path="create" element={<CreateDeck uid={uid} />} />
          <Route path="collections" element={<DeckCollection uid={uid} changeDeck={changeDeck} />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Fragment>
  )
}

export default App;
