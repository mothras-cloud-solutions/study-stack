import React from 'react';
import { useState } from 'react';
import DeckThumbnail from '../../Skeleton/components/DeckThumbnail.tsx';

type DeckType = {
  id: number;
  term: string;
  definition: string;
  archived: boolean;
};

const DeckCollection: React.FC = () => {
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);

  // Create a handler for when a deck is selected
  const handleDeckSelect = (deck: DeckType) => {
    setSelectedDeck(deck);
  }

  const decksData = [
    { id: 1, title: 'Deck 1', description: 'Description for Deck 1', cardCount: 12 },
    { id: 2, title: 'Deck 2', description: 'Description for Deck 2', cardCount: 10 },
    { id: 3, title: 'Deck 3', description: 'Description for Deck 3', cardCount: 2 },
    { id: 4, title: 'Deck 4', description: 'Description for Deck 4', cardCount: 20 }
  ];

  // cards dummy data
  const cards = [
    { id: 1, term: 'Component', definition: 'A reusable, self-contained piece of UI', archived: false },
    { id: 2, term: 'State', definition: 'Local state within a component', archived: false },
    { id: 3, term: 'Props', definition: 'Properties passed from parent to child component', archived: true },
    { id: 4, term: 'Hook', definition: 'A function that lets you "hook into" React state and lifecycle features', archived: false },
    { id: 5, term: 'Virtual DOM', definition: 'A lightweight copy of the DOM tree maintained by React', archived: true },
  ];
  return (
    <div className="box">
      <h2 className="title is-3">My Decks / Deck Selector</h2>
      <div className="columns">
        {decksData.map(deck => (
          <div className="column is-one-quarter" key={deck.id}>
            <DeckThumbnail title={deck.title} description={deck.description} cardCount={deck.cardCount} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeckCollection;
