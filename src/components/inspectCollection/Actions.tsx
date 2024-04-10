import React, { useState } from 'react';
import './Actions.css'; // Make sure this import path is correct

const Actions: React.FC = () => {
  const [showMoreActions, setShowMoreActions] = useState(false);

  const handleEdit = () => {
    console.log('Edit clicked');
    // Implementation for edit
  };

  const handleStudy = () => {
    console.log('Study clicked');
    // Implementation for study
  };

  const handleDeleteDeck = () => {
    console.log('Delete Deck clicked');
    // Implementation for delete
  };

  const handleImportDeck = () => {
    console.log('Import Deck clicked');
    // Implementation for import
  };

  const handleExportDeck = () => {
    console.log('Export Deck clicked');
    // Implementation for export
  };

  return (
    <div className="actions-container space-y-2">
      <button
        onClick={handleEdit}
        className="button"
      >
        Edit
      </button>
      <button
        onClick={handleStudy}
        className="button"
      >
        Study
      </button>
      <button
        onClick={() => setShowMoreActions(!showMoreActions)}
        className="button"
      >
        ...
      </button>

      {showMoreActions && (
        <div className={`more-actions ${showMoreActions ? 'show' : ''}`}>
          <button
            onClick={handleDeleteDeck}
            className="button"
          >
            Delete Deck
          </button>
          <button
            onClick={handleImportDeck}
            className="button"
          >
            Import Deck
          </button>
          <button
            onClick={handleExportDeck}
            className="button"
          >
            Export Deck
          </button>
        </div>
      )}
    </div>
  );
};

export default Actions;