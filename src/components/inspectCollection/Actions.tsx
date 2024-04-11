import React, { useState } from 'react';
import './Actions.css';
import { useNavigate } from 'react-router-dom';

const Actions: React.FC = () => {
  const [showMoreActions, setShowMoreActions] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log('Edit clicked');
    navigate('/create');
  };

  const handleStudy = () => {
    console.log('Study clicked');
    navigate('/learn');
  };

  const handleDeleteDeck = () => {
    console.log('Delete Deck clicked');
  };

  const handleImportDeck = () => {
    console.log('Import Deck clicked');
  };

  const handleExportDeck = () => {
    console.log('Export Deck clicked');
  };

  return (
    <div className="action-container space-y-2">
      <button
        onClick={handleEdit}
        className="action-button"
      >
        Edit
      </button>
      <button
        onClick={handleStudy}
        className="action-button"
      >
        Study
      </button>
      <button
        onClick={() => setShowMoreActions(!showMoreActions)}
        className="action-button"
      >
        ...
      </button>

      {showMoreActions && (
        <div className={`additional-actions ${showMoreActions ? 'show' : ''}`}>
          <button
            onClick={handleDeleteDeck}
            className="action-button"
          >
            Delete Deck
          </button>
          <button
            onClick={handleImportDeck}
            className="action-button"
          >
            Import Deck
          </button>
          <button
            onClick={handleExportDeck}
            className="action-button"
          >
            Export Deck
          </button>
        </div>
      )}
    </div>
  );
};

export default Actions;
