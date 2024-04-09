import React, { useState, useEffect } from 'react';
import DeckForm from './DeckForm';
import DeckCardCollection from './DeckCardCollection';
import CardForm from './CardForm';

const CreateEditDeck = ({ deckId }) => {
  const [deckName, setDeckName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [cards, setCards] = useState([]);
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch deck data if deckId is provided (in edit mode)
    if (true) {
      // Simulated fetched deck data based on deckId
      const fetchedDeckData = {
        deckName: 'Sample Deck',
        keywords: 'React, JavaScript, Programming',
        cards: [
          { id: 1, term: 'Component', definition: 'A reusable, self-contained piece of UI', archived: false },
          { id: 2, term: 'State', definition: 'Local state within a component', archived: false },
          { id: 3, term: 'Props', definition: 'Properties passed from parent to child component', archived: true },
          { id: 4, term: 'Hook', definition: 'A function that lets you "hook into" React state and lifecycle features', archived: false },
          { id: 5, term: 'Virtual DOM', definition: 'A lightweight copy of the DOM tree maintained by React', archived: true },
        ],
      };
      // Update state with fetched data
      setDeckName(fetchedDeckData.deckName);
      setKeywords(fetchedDeckData.keywords);
      setCards(fetchedDeckData.cards);
    }
  }, [deckId]);

  const handleCardEdit = (cardId) => {
    // Redirect to Create/Edit Card page in edit mode with card data loaded
    // Example: history.push(`/edit-card/${cardId}`);
  };

  const handleCardDelete = (cardId) => {
    // Delete the card from the deck
    // Example: deleteCard(cardId);
    // Update state to remove the card from the cards array
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
  };

  const handleCardArchive = (cardId) => {
    // Archive the card
    // Example: archiveCard(cardId);
    // Update state to reflect the archived status of the card
    const updatedCards = cards.map(card => {
      if (card.id === cardId) {
        return { ...card, archived: true };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleCardUnarchive = (cardId) => {
    // Unarchive the card
    // Example: unarchiveCard(cardId);
    // Update state to reflect the unarchived status of the card
    const updatedCards = cards.map(card => {
      if (card.id === cardId) {
        return { ...card, archived: false };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleCardOrderChange = (newOrder) => {
    // Update the order of cards based on newOrder
    // Example: updateCardOrder(newOrder);
    // Update state to reflect the new order
    setCards(newOrder);
  };

  const handleAddNewCard = () => {
    // Validate inputs
    if (!term || !definition) {
      setError('Both term and definition are required');
      return;
    }
    // Add new card to the deck
    const newCard = {
      id: cards.length + 1, // Dummy ID generation (should be handled by backend in real application)
      term,
      definition,
      archived: false,
    };
    setCards([...cards, newCard]);
    // Reset input fields and error message
    setTerm('');
    setDefinition('');
    setError('');
  };

  const handleSave = () => {
    // Save all changes made to the deck
    // Example: saveDeckChanges(deckId, deckName, keywords, cards);
    // Redirect to Deck Selection page
    // Example: history.push('/deck-selection');
  };

  const handleCancel = () => {
    // Redirect to Deck Selection page without saving any changes
    // Example: history.push('/deck-selection');
  };

  return (
    <div className="box">
      <h3 className="title is-3">Create Edit Deck</h3>
      <DeckForm
        deckName={deckName}
        keywords={keywords}
        setDeckName={setDeckName}
        setKeywords={setKeywords}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
      {/* <DeckCardCollection
        cards={cards}
        handleCardEdit={handleCardEdit}
        handleCardDelete={handleCardDelete}
        handleCardArchive={handleCardArchive}
        handleCardUnarchive={handleCardUnarchive}
        handleCardOrderChange={handleCardOrderChange}
      /> */}
      <CardForm
        term={term}
        definition={definition}
        setTerm={setTerm}
        setDefinition={setDefinition}
        handleAddNewCard={handleAddNewCard}
        error={error}
      />
    </div>
  );
};

export default CreateEditDeck;
