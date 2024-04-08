import React, { useState, ChangeEvent } from 'react';

interface CardFormProps {
  term: string;
  definition: string;
  error: string | null;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setDefinition: React.Dispatch<React.SetStateAction<string>>;
  handleAddNewCard: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ term, definition, error, setTerm, setDefinition, handleAddNewCard }) => {
  const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleDefinitionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDefinition(e.target.value);
  };

  return (
    <div className="box">
      <h3 className="title is-4">Add New Card</h3>
      <div className="field">
        <label className="label">Term</label>
        <div className="control">
          <input className="input" type="text" value={term} onChange={handleTermChange} />
        </div>
      </div>
      <div className="field">
        <label className="label">Definition</label>
        <div className="control">
          <input className="input" type="text" value={definition} onChange={handleDefinitionChange} />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary" onClick={handleAddNewCard}>Add Card</button>
        </div>
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export default CardForm;
