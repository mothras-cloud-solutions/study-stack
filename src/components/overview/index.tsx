import React, { Fragment } from 'react';
import { Links } from 'react-router-dom';
import DeckCollection from '../Skeleton/components/DeckCollection';
import Search from './components/Search';
import Footer from './components/Footer';


function Overview() {
  const decksData = [
    { id: 1, title: 'Deck 1', description: 'Description for Deck 1', cardCount: 12 },
    { id: 2, title: 'Deck 2', description: 'Description for Deck 2', cardCount: 10 },
    { id: 3, title: 'Deck 3', description: 'Description for Deck 3', cardCount: 2 },
    { id: 4, title: 'Deck 4', description: 'Description for Deck 4', cardCount: 20 }
  ];
  return (
    <Fragment>
      <h1>Overview</h1>
      {/* <Search items={}/> */}
      <DeckCollection decks={decksData}/>
      {/* <Search/> */}
      <Footer />
    </Fragment>
  );
}

export default Overview;
