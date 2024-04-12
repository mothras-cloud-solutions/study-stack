import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import DeckForm from './DeckForm';
import CardForm from './CardForm';
import DeckCards from './DeckCardCollection';
import Footer from './Footer';

interface CreateEditDeckProps {
  uid: string;
}

interface Card {
  id: number;
  term: string;
  definition: string;
  keywords: string;
  archived: boolean;
}

const CreateEditDeck: React.FC<CreateEditDeckProps> = ({ uid }) => {
  const [searchParams] = useSearchParams();
  const [deckId, setDeckId] = useState<string | undefined>(searchParams.get('deckId'));
  const [deckName, setDeckName] = useState('');
  const [subjects, setSubjects] = useState('');
  const [titleError, setTitleError] = useState('');
  const [subjectsError, setSubjectsError] = useState('');
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (savedSuccessfully) {
      timer = setTimeout(() => {
        setSavedSuccessfully(false);
      }, 5000); // 5 seconds
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [savedSuccessfully]);

  useEffect(() => {
    const fetchDeckData = async () => {
      setIsLoading(true);
      setError('');

      if (deckId && !isEditing) {
        try {
          const deckResponse = await axios.get(`/api/collections/${deckId}`);
          const { title, subjects } = deckResponse.data;
          setDeckName(title);
          setSubjects(subjects);
          setIsEditing(true);
          const cardsResponse = await axios.get(`api/flashcards/collection_id/${deckId}`);
          console.log('cardsResponse: ', cardsResponse.data);
          setCards(cardsResponse.data);
        } catch (error) {
          console.error('Error fetching deck data:', error);
          setError('An error occurred while fetching the deck data. Please try again.');
        }
      }

      setIsLoading(false);
    };

    fetchDeckData();
  }, [deckId, isEditing]);

  const handleCardEdit = (card: Card) => {
    setEditingCard(card);
  };

  const handleCardDelete = async (cardId: number) => {
    try {
      await axios.delete(`/api/flashcards/${cardId}`);
      setCards(cards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
      setError('An error occurred while deleting the card. Please try again.');
    }
  };

  const handleCardArchive = async (cardId: number) => {
    try {
      const response = await axios.put(`/api/flashcards/${cardId}/archived`);
      const { newArchivedStatus } = response.data;
      setCards(cards.map(card => (card.id === cardId ? { ...card, archived: newArchivedStatus === 1 } : card)));
    } catch (error) {
      console.error('Error archiving card:', error);
      setError('An error occurred while archiving the card. Please try again.');
    }
  };

  const handleCardUnarchive = async (cardId: number) => {
    try {
      const response = await axios.put(`/api/flashcards/${cardId}/archived`);
      const { newArchivedStatus } = response.data;
      setCards(cards.map(card => (card.id === cardId ? { ...card, archived: newArchivedStatus === 1 } : card)));
    } catch (error) {
      console.error('Error unarchiving card:', error);
      setError('An error occurred while unarchiving the card. Please try again.');
    }
  };

  const handleNewCardSave = (newCard: Card) => {
    setCards([newCard, ...cards]);
  };

  const handleCardUpdate = (updatedCard: Card) => {
    setCards(cards.map(card => (card.id === updatedCard.id ? updatedCard : card)));
  };

  const handleSaveDeck = async () => {
    setSaving(true);
    if (!deckName.trim()) {
      setSaving(false);
      setTitleError('Deck name is required');
      return;
    }
    if (!subjects.trim()) {
      setSaving(false);
      setSubjectsError('Keywords are required');
      return;
    }

    try {
      let response;
      if (isEditing) {
        // Update an existing deck
        response = await axios.put(`/api/collections/${deckId}`, {
          title: deckName,
          subjects: subjects,
          user_id: uid,
        });
      } else {
        // Create a new deck
        response = await axios.post('/api/collections/', {
          title: deckName,
          subjects: subjects,
          user_id: uid,
        });
        setDeckId(response.data.id); // Set the deckId with the new deck ID
      }

      console.log('Collection saved:', response.data);
      setSavedSuccessfully(true);
      if (!isEditing) {
        setDeckName('');
        setSubjects('');
      }
    } catch (error) {
      console.error('Error saving collection:', error);
      setTitleError(
        isEditing
          ? 'An error occurred while updating the deck. Please try again.'
          : 'An error occurred while saving the deck. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Redirect to Deck Selection page without saving any changes
    // Example: history.push('/deck-selection');
  };

  return (
    <div className="box">
      <h3 className="title is-3">{isEditing ? 'Edit Deck' : 'Create New Deck'}</h3>
      {isLoading ? (
        <div className="box">
          <h1 className="title is-skeleton">Title</h1>
          <h2 className="subtitle has-skeleton">Subtitle</h2>
          <textarea className="textarea is-skeleton"></textarea>
          <input className="input is-skeleton" />
          <button className="button is-skeleton">Button</button>
        </div>
      ) : error ? (
        <div className="box">
          <p className="has-text-danger">{error}</p>
        </div>
      ) : (
        <>
<DeckForm
  deckName={deckName}
  subjects={subjects}
  setDeckName={setDeckName}
  setSubjects={setSubjects}
  titleError={titleError}
  subjectsError={subjectsError}
  setTitleError={setTitleError}
  setSubjectsError={setSubjectsError}
  handleSave={handleSaveDeck}
  handleCancel={handleCancel}
  savedSuccessfully={savedSuccessfully}
  saving={saving}
  isEditing={isEditing}
  setDeckId={setDeckId} // Pass setDeckId as a prop
/>
<div className="card-form-container">
          <CardForm
            deckId={deckId}
            editingCard={editingCard}
            setEditingCard={setEditingCard}
            handleNewCardSave={handleNewCardSave}
            handleCardUpdate={handleCardUpdate}
            isCreateMode={!isEditing} // Pass isCreateMode prop
          />
          </div>
          {deckId && (
            <DeckCards
              cards={cards}
              handleCardEdit={handleCardEdit}
              handleCardDelete={handleCardDelete}
              handleCardArchive={handleCardArchive}
              handleCardUnarchive={handleCardUnarchive}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CreateEditDeck;
