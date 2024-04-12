import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import Quill from 'quill';
import axios from 'axios';
import CardEditor from '../../cardEditor/index.tsx';


interface CardFormProps {
  deckId?: string;
  editingCard: Card | null;
  setEditingCard: React.Dispatch<React.SetStateAction<Card | null>>;
  handleNewCardSave: (newCard: Card) => void;
  handleCardUpdate: (updatedCard: Card) => void;
  isCreateMode: boolean; // Add isCreateMode prop
}

interface Card {
  id: number;
  term: string;
  definition: string;
  keywords: string;
  archived: boolean;
  confidenceLevel: number;
  collection_id: number;
  canvas_front: string;
  canvas_back: string;
}

const CardForm: React.FC<CardFormProps> = ({
  deckId,
  editingCard,
  setEditingCard,
  handleNewCardSave,
  handleCardUpdate,
  isCreateMode, // Destructure isCreateMode prop
}) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [keywords, setKeywords] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
// Wyatt Advance Editor
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
      });
      quillRef.current = quill;
    }
  }, []);

  useEffect(() => {
    if (editingCard && quillRef.current) {
      const delta = quillRef.current.clipboard.convert(editingCard.definition);
      quillRef.current.setContents(delta);
      setTerm(editingCard.term);
      setKeywords(editingCard.keywords);
    }
  }, [editingCard]);

  useEffect(() => {
    if (quillRef.current) {
      const handleTextChange = () => {
        setDefinition(quillRef.current.root.innerHTML);
      };

      quillRef.current.on('text-change', handleTextChange);

      return () => {
        quillRef.current.off('text-change', handleTextChange);
      };
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (success) {
      timer = setTimeout(() => {
        setSuccess('');
      }, 3000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [success]);

  const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    setError('');
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
    setError('');
  };

    const changeAdvancedState = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleSaveCard = async () => {
    if (!term.trim()) {
      setError('Prompt is required');
      return;
    }

    if (!definition.trim()) {
      setError('Response is required');
      return;
    }

    if (!keywords.trim()) {
      setError('Keywords are required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

      try {
        const response = editingCard
          ? await axios.put(`/api/flashcards/${editingCard.id}`, {
              term,
              definition,
              keywords,
              collection_id: editingCard.collection_id,
            })
          : await axios.post('/api/flashcards/', {
              term,
              definition,
              confidenceLevel: 0,
              keywords,
              archived: 0,
              starred: 0,
              collection_id: deckId,
            });

        const updatedCard = editingCard ? response.data : response.data.flashcard;
        updatedCard.canvas_front = '';
        updatedCard.canvas_back = '';
        console.log('Card saved successfully:', updatedCard);
        setTerm('');
        setDefinition('');
        setKeywords('');
        setEditingCard(null);
        quillRef.current?.setText(''); // Clear the text editor
        setSuccess(editingCard ? 'Card updated successfully!' : 'Card saved successfully!');
        if (editingCard) {
          handleCardUpdate(updatedCard);
        } else {
          handleNewCardSave(updatedCard);
        }
      } catch (error) {
        console.error('Error saving card:', error);
        setError('Error saving card. Please try again.');
      } finally {
        setSaving(false);
      }
    };

  const handleCancelOrEdit = () => {
    setError('');
    setSuccess('');
    setShowAdvanced(false);
    setEditingCard(null);
    setTerm('');
    setDefinition('');
    setKeywords('');
    quillRef.current?.setText(''); // Clear the text editor
  };

  return (
    <div className={`box card-form ${isCreateMode ? 'card-form-hidden' : ''}`}>
      <h3 className="title is-4">{editingCard ? 'Edit Card' : 'Add New Card'}</h3>
      <div className="field">
        <label className="label">Prompt</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={term}
            onChange={handleTermChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Response</label>
        <div className="control">
          <div ref={editorRef} style={{ height: '200px' }} />
        </div>
      </div>
      <div className="field">
        <label className="label">Keywords</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={keywords}
            onChange={handleKeywordChange}
          />
        </div>
      </div>
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          {error && <span className="tag is-danger is-light">{error}</span>}
          {success && <span className="tag is-success is-light">{success}</span>}
        </div>
        <div className="control">
          <button
            className={`button is-primary ${saving ? 'is-loading' : ''}`}
            onClick={handleSaveCard}
            disabled={saving}
          >
            {editingCard ? 'Update Card' : 'Save Card'}
          </button>
        </div>
        <div className="control">
          <button className="button is-normal" onClick={handleCancelOrEdit}>
            Cancel
          </button>
        </div>
        <div className="control">
          {/* Button to render to Wyatt's editor or redirect to it */}
          {editingCard && <button className="button is-light" onClick={changeAdvancedState}>Advanced Edit Mode</button>}
        </div>
      </div>
      {showAdvanced && <CardEditor card={editingCard} closeEditor={changeAdvancedState}/>}
    </div>
  );
};

export default CardForm;









