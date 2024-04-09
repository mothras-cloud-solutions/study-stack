import React from 'react';
import Skeleton from './components/Skeleton';
import DeckCollection from './components/inspectCollection/DeckCollection';
import StudyPageTest from './components/learnCollection/testcollection';

function App() {
  return (
    <div>
      <DeckCollection />
      <StudyPageTest />
    </div>
  );
}

export default App;