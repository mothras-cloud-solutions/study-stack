import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeckForm from './DeckForm';
import CardForm from './CardForm';

interface CreateEditDeckProps {
  uid: string;
  deckId?: string;
}

const CreateEditDeck: React.FC<CreateEditDeckProps> = ({ uid, deckId }) => {
  const [deckName, setDeckName] = useState('');
  const [subjects, setSubjects] = useState('');
  const [titleError, setTitleError] = useState('');
  const [subjectsError, setSubjectsError] = useState('');
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [saving, setSaving] = useState(false);

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
      const response = await axios.post('/api/collections', {
        title: deckName,
        subjects,
        uid,
      });
      console.log('Collection saved:', response.data);
      setSavedSuccessfully(true);
      setDeckName('');
      setSubjects('');
    } catch (error) {
      console.error('Error saving collection:', error);
      // Display user-friendly error message
      setTitleError('An error occurred while saving the deck. Please try again.');
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
      {/* <h3 className="title is-3">Create New Deck</h3> */}
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
      <CardForm deckId={deckId} />
    </div>
  );
};

export default CreateEditDeck;