// App.jsx in Skeleton
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import AuthForms from './components/AuthForms';
import Card from './components/Card';
import EditCard from './components/EditCard';
import CreateDeck from './components/CreateDeck';
import DeckCardCollection from './components/DeckCardCollection';
import DeckCollection from './components/DeckCollection';

const Skeleton: React.FC = () => {
  const [user, setUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false); // State to control the visibility of AuthForms
  const [showHome, setShowHome] = useState(true); // State to control the visibility of the Home Page

  const handleLoginLinkClick = () => {
    setShowLoginForm(true); // Show AuthForms when Sign In link is clicked
  };
  const handleHomeLinkClick = () => {
    setShowLoginForm(false); // Show Home when Home link is clicked
  };
  const handleSignOutClick = () => {
    setShowLoginForm(false); // Hide AuthForms
    // any additional logic here if needed
  };
  const handleCreateLinkClick = () => {
    alert('Create Link Was Cliecked')
    setShowCreateForm(true); // Show Create Forn when Create link is clicked
  };

  const handleShowHome = () => {
    console.log('Cancel Link Was Clicked In The Registration Form')
    setShowHome(true);
    setShowLoginForm(false); // Show Home when Home link is clicked
  };

    // Dummy data for decks
    const decksData = [
      { id: 1, title: 'Deck 1', description: 'Description for Deck 1', cardCount: 12 },
      { id: 2, title: 'Deck 2', description: 'Description for Deck 2', cardCount: 10 },
      { id: 3, title: 'Deck 3', description: 'Description for Deck 3', cardCount: 2 },
      { id: 4, title: 'Deck 4', description: 'Description for Deck 4', cardCount: 20 }
    ];

  return (
    <>
      <NavBar />
      <section className="section">
        <div className="container">
          {isLoading ? (
            <p>Loading...</p>
          ) : user ? (
            <>
              {/* Render components for signed-in users */}
              {/* <CreateSearch /> */}
              {/* <CreateDeck  /> */}

              <HomePage />

              <Card  />
              {/* <EditCard  /> */}

              <DeckCardCollection />

              <DeckCollection decks={decksData}/>

            </>
          ) : (
            // If user is not signed in, render auth forms or home components
            <>
              {showLoginForm ? <AuthForms onCancelClick={handleShowHome} /> :  <HomePage onLoginLinkClick={handleLoginLinkClick} />} {/* Render AuthForms only if showLoginForm is true */}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Skeleton;
