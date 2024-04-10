import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import Quill from 'quill';
import axios from 'axios';

interface CardFormProps {
  deckId?: string;
}

const CardForm: React.FC<CardFormProps> = ({ deckId }) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [keywords, setKeywords] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  // const [editor, setEditor] = useState<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
      });

      const content = quill.getModule('clipboard');
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.target === content.container) {
            setDefinition(quill.root.innerHTML);
          }
        });
      });

      observer.observe(content.container, { childList: true, subtree: true });

      quillRef.current = quill;

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (success) {
      timer = setTimeout(() => {
        setSuccess('');
      }, 3000); // 3 seconds
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [success]);

  const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    if (error) setError(''); // Clear error message when user starts typing
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
    if (error) setError(''); // Clear error message when user starts typing
  };

  const handleSaveCard = async () => {
    if (!term.trim()) {
      setError('Term is required');
      return;
    }

    if (!definition.trim()) {
      setError('Definition is required');
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
      const response = await axios.post('/api/flashcards', {
        term,
        definition,
        confidenceLevel: 0,
        keywords,
        archived: 0,
        starred: 0,
        collection_id: 12,
      });
      console.log('Card saved successfully:', response.data);
      setTerm('');
      setDefinition('');
      setKeywords('');
      setSuccess('Card saved successfully!');
    } catch (error) {
      console.error('Error saving card:', error);
      setError('Error saving card. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="box">
      <h3 className="title is-4">Add New Card</h3>
      <div className="field">
        <label className="label">Term</label>
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
        <label className="label">Definition</label>
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
      <div className="field is-grouped">
        <div className="control">
          <button
            className={`button is-primary ${saving ? 'is-loading' : ''}`}
            onClick={handleSaveCard}
            disabled={saving}
          >
            Save Card
          </button>
        </div>
        <div className="control">
          <button className="button is-normal">Cancel</button>
        </div>
        {error && <p className="help is-danger">{error}</p>}
        {success && <p className="help is-success">{success}</p>}
      </div>
    </div>
  );
};

export default CardForm;