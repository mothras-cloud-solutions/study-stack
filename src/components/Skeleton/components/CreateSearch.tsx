import React from 'react';

const CreateSearch = () => {
  return (
    <div className="box has-text-centered h-screen flex justify-center items-center">
      <h2 className="title is-2">How do you want to get started?</h2>
      <div className="columns mt-4">
        <div className="column is-one-half">
          {/* Create Deck Option */}
          <div className="deck-option card options">
            <div className="card-content">
              <span className="icon is-large">
                <i className="fas fa-plus fa-3x"></i> {/* Font Awesome icon for creating a deck */}
              </span>
              <p className="title is-4">Create a New Deck</p>
              <p className="subtitle is-6">Start from scratch</p>
              <p className="content">Create a new deck and add your own flashcards.</p>
            </div>
          </div>
        </div>
        <div className="column is-one-half">
          {/* Search Decks Option */}
          <div className="deck-option card options">
            <div className="card-content">
              <span className="icon is-large">
                <i className="fas fa-search fa-3x"></i> {/* Font Awesome icon for searching decks */}
              </span>
              <p className="title is-4">Search Decks</p>
              <p className="subtitle is-6">Find existing decks</p>
              <p className="content">Search for decks created by other users.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSearch;
