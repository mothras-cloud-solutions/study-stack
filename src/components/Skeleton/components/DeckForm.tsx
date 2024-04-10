import React, { useState, useEffect } from 'react';

interface DeckFormProps {
  deckName: string;
  subjects: string;
  setDeckName: React.Dispatch<React.SetStateAction<string>>;
  setSubjects: React.Dispatch<React.SetStateAction<string>>;
  titleError: string;
  subjectsError: string;
  setTitleError: React.Dispatch<React.SetStateAction<string>>;
  setSubjectsError: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  savedSuccessfully: boolean;
  saving: boolean;
}

const DeckForm: React.FC<DeckFormProps> = ({
  deckName,
  subjects,
  setDeckName,
  setSubjects,
  titleError,
  subjectsError,
  setTitleError,
  setSubjectsError,
  handleSave,
  handleCancel,
  savedSuccessfully,
  saving,
}) => {
  const [titleTyping, setTitleTyping] = useState(false);
  const [subjectsTyping, setSubjectsTyping] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // 3 seconds
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [successMessage]);

  useEffect(() => {
    if (savedSuccessfully) {
      setSuccessMessage('Deck saved successfully!');
    }
  }, [savedSuccessfully]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTyping(true);
    if (titleError) setTitleError('');
    setDeckName(e.target.value);
  };

  const handleSubjectsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectsTyping(true);
    if (subjectsError) setSubjectsError('');
    setSubjects(e.target.value);
  };

  const handleSubmit = async () => {
    setTitleTyping(false);
    setSubjectsTyping(false);
    await handleSave();
  };

  return (
    <div className="box">
      <h3 className="title is-4">Create New Deck</h3>
      <div className="field">
        <label className="label">Deck Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={deckName}
            onChange={handleTitleChange}
          />
        </div>
        {titleError && !titleTyping && (
          <p className="help is-danger">{titleError}</p>
        )}
      </div>
      <div className="field">
        <label className="label">Keywords</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={subjects}
            onChange={handleSubjectsChange}
          />
        </div>
        {subjectsError && !subjectsTyping && (
          <p className="help is-danger">{subjectsError}</p>
        )}
      </div>
      {successMessage && <p className="help is-success">{successMessage}</p>}
      <div className="field is-grouped">
        <div className="control">
          <button
            className={`button is-link ${saving ? 'is-loading' : ''}`}
            onClick={handleSubmit}
            disabled={saving}
          >
            Save Deck
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckForm;