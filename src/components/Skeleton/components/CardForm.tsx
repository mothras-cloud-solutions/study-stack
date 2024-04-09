import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import Quill from 'quill';
import axios from 'axios'; // Import Axios library

interface CardFormProps {
  term: string;
  definition: string;
  error: string | null;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setDefinition: React.Dispatch<React.SetStateAction<string>>;
  handleAddNewCard: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ term, definition, error, setTerm, setDefinition, handleAddNewCard }) => {
  const [editor, setEditor] = useState<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow'
      });
      quill.on('text-change', () => {
        setDefinition(quill.root.innerHTML);
      });
      setEditor(quill);
    }
  }, []);

  const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  // Function to handle saving the card
  const handleSaveCard = async () => {
    try {
      const response = await axios.post('/api/cards', {
        term,
        definition
        // Add any additional fields here
      });
      // Handle success
      console.log('Card saved successfully:', response.data);
      handleAddNewCard(); // Call parent function to handle adding new card
    } catch (error) {
      // Handle error
      console.error('Error saving card:', error);
    }
  };

  return (
    <div className="box">
      <h3 className="title is-4">Add New Card / Edit</h3>
      <div className="field">
        <label className="label">Term</label>
        <div className="control">
          <input className="input" type="text" value={term} onChange={handleTermChange} />
        </div>
      </div>
      <div className="field">
        <label className="label">Definition</label>
        <div className="control">
          <div ref={editorRef} style={{ height: '200px' }} />
        </div>
      </div>
      <div className="field">
        <label className="label">Keywords</label>
        <div className="control">
          <input className="input" type="text" value="Keywords" />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary" onClick={handleSaveCard}>Save</button>
          </div>
        <div className="control">
          <button className="button is-normal">Cancel</button>
        </div>
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export default CardForm;
