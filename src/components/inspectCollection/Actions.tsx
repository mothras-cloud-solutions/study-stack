import React, { useState } from 'react';
import './Actions.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type ActionsProps = {
  selectedDeck: {
    id: number;
    flashcards: any[];
  } | null;
  onStudy: (cards: any[]) => void;
};

const Actions: React.FC<ActionsProps> = ({ selectedDeck, onStudy }) => {
  const [showMoreActions, setShowMoreActions] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/create');
  };

  const handleStudy = () => {
    if (selectedDeck) {
      navigate('/learn', { state: { cards: selectedDeck.flashcards } });
    }
  };

  const handleDeleteDeck = () => {
    if (selectedDeck && window.confirm('Are you sure you want to delete the currently selected deck?')) {
      axios.delete(`/api/collections/${selectedDeck.id}`)
        .then(response => {
          alert(response.data.message);
          // refresh
          navigate('/collections');
        })
        .catch(error => {
          console.error('Error deleting deck:', error);
          alert('Failed to delete the deck.');
        });
    }
  };

  const handleImportDeck = () => {
    console.log('Import Deck clicked');
  };

  const handleExportDeck = () => {
    console.log('Export Deck clicked');
  };

  return (
    <div className="action-container space-y-2">
      <button onClick={handleEdit} className="action-button">Edit</button>
      <button onClick={handleStudy} className="action-button">Study</button>
      <button onClick={() => setShowMoreActions(!showMoreActions)} className="action-button">...</button>
      {showMoreActions && (
        <div className={`additional-actions ${showMoreActions ? 'show' : ''}`}>
          <button onClick={handleDeleteDeck} className="action-button">Delete Deck</button>
          <button onClick={handleImportDeck} className="action-button">Import Deck</button>
          <button onClick={handleExportDeck} className="action-button">Export Deck</button>
        </div>
      )}
    </div>
  );
};

export default Actions;
