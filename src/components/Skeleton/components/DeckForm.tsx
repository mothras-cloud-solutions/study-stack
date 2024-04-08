import React from 'react';

const DeckForm = ({ deckName, keywords, setDeckName, setKeywords, handleSave, handleCancel }) => {
  return (
    <div className="box">
      <h3 className="title is-4">Create Edit Deck</h3>
      <div className="field">
        <label className="label">Deck Name</label>
        <div className="control">
          <input className="input" type="text" value={deckName} onChange={(e) => setDeckName(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label className="label">Keywords</label>
        <div className="control">
          <input className="input" type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={handleSave}>Save</button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      </div>
  );
};

export default DeckForm;
