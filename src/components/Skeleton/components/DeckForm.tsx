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
  isEditing: boolean;
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
  isEditing,
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
      setSuccessMessage(isEditing ? 'Deck updated successfully!' : 'Deck saved successfully!');
    }
  }, [savedSuccessfully, isEditing]);

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

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className={`button is-link ${saving ? 'is-loading' : ''}`}
            onClick={handleSubmit}
            disabled={saving}
          >
            {isEditing ? 'Update Deck' : 'Save Deck'}
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        <div className="control">
        {titleError && !titleTyping && (
          <span className="tag  is-light is-danger">{titleError}</span>
        )}
        {subjectsError && !subjectsTyping && (
          <span className="tag  is-light is-danger">{subjectsError}</span>
        )}
        {successMessage && <span className="tag is-success  is-light">{successMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default DeckForm;