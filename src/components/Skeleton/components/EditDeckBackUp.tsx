import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeckForm from './DeckForm';
import CardForm from './CardForm';
import DeckCards from './DeckCardCollection';

interface CreateEditDeckProps {
  uid: string;
  deckId?: string;
}

interface Card {
  id: number;
  term: string;
  definition: string;
  keywords: string;
  archived: boolean;
}

const CreateEditDeck: React.FC<CreateEditDeckProps> = ({ uid, deckId }) => {
  const [deckName, setDeckName] = useState('');
  const [subjects, setSubjects] = useState('');
  const [titleError, setTitleError] = useState('');
  const [subjectsError, setSubjectsError] = useState('');
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isEditing, setIsEditing] = useState(true);
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

      if (true) {
        try {
          const deckResponse = await axios.get(`/api/collections/3`);
          const { title, subjects } = deckResponse.data;
          setDeckName(title);
          setSubjects(subjects);
          setIsEditing(true);
          const cardsResponse = await axios.get(`api/flashcards/collection_id/3`);
          console.log('cardsResponse: ', cardsResponse);
          setCards(cardsResponse.data);
        } catch (error) {
          console.error('Error fetching deck data:', error);
          setError('An error occurred while fetching the deck data. Please try again.');
        }
      }

      setIsLoading(false);
    };

    fetchDeckData();
  }, [deckId]);

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
      await axios.put(`/api/flashcards/${cardId}`, { archived: true });
      setCards(cards.map(card => (card.id === cardId ? { ...card, archived: true } : card)));
    } catch (error) {
      console.error('Error archiving card:', error);
      setError('An error occurred while archiving the card. Please try again.');
    }
  };

  const handleCardUnarchive = async (cardId: number) => {
    try {
      await axios.put(`/api/flashcards/${cardId}`, { archived: false });
      setCards(cards.map(card => (card.id === cardId ? { ...card, archived: false } : card)));
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
      const response = isEditing
        ? await axios.put(`/api/collections/3`, {
            title: deckName,
            subjects,
            uid,
          })
        : await axios.post('/api/collections', {
            title: deckName,
            subjects,
            uid,
          });
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
          />
          <CardForm
            deckId={3}
            editingCard={editingCard}
            setEditingCard={setEditingCard}
            handleNewCardSave={handleNewCardSave}
            handleCardUpdate={handleCardUpdate}
          />
          {3 && (
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