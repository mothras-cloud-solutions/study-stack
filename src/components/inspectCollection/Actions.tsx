
import React, { useState } from 'react';
import './Actions.css';
import { useNavigate } from 'react-router-dom';
import { exportCollection } from './utils/exportFile.ts';
import axios from 'axios';

type ActionsProps = {
  selectedDeck: {
    id: number;
    flashcards: any[];
  } | null;
  onStudy: (cards: any[]) => void;
};

const Actions: React.FC<ActionsProps> = ({ selectedDeck, onStudy, onDelete }) => {
  const [showMoreActions, setShowMoreActions] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    if (selectedDeck) {
      navigate(`/create?deckId=${selectedDeck.id}`);
    } else {
      navigate('/create');
    }
  };

  const handleStudy = () => {
    if (selectedDeck) {
      navigate('/learn', { state: { cards: selectedDeck.flashcards } });
    } else {
      alert('Please add flashcards to the deck before studying!');
    }
  };

  const handleDeleteDeck = () => {
    if (selectedDeck && window.confirm('Are you sure you want to delete the currently selected deck?')) {
      axios.delete(`/api/collections/${selectedDeck.id}`)
        .then(response => {
          alert(response.data.message);
          onDelete(selectedDeck.id);
          navigate('/collections');
        })
        .catch(error => {
          console.error('Error deleting deck:', error);
          alert('Failed to delete the deck.');
        });
    }
  };


  const handleExportDeck = () => {
    console.log('Export Deck clicked');
    exportCollection(selectedDeck.id);

  };

  return (
    <div className="action-container space-y-2">
      <button onClick={handleEdit} className="action-button">Edit</button>
      <button onClick={handleStudy} className="action-button">Study</button>
      <button onClick={() => setShowMoreActions(!showMoreActions)} className="action-button">More options...</button>
      {showMoreActions && (
        <div className={`additional-actions ${showMoreActions ? 'show' : ''}`}>
          <button onClick={handleDeleteDeck} className="action-button">Delete Deck</button>
          <button onClick={handleExportDeck} className="action-button">Export Deck</button>
        </div>
      )}
    </div>
  );
};

export default Actions;
