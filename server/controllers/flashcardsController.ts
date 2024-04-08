import { Request, Response } from 'express';
import { pool } from '../database/db';

export const getAllFlashcards = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM flashcards');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching flashcards:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getFlashcardById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM flashcards WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (err) {
        console.error('Error fetching flashcard:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createFlashcard = async (req: Request, res: Response) => {
    const { term, definition, confidenceLevel, keywords, collection_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO flashcards (term, definition, confidenceLevel, keywords, collection_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [term, definition, confidenceLevel, keywords, collection_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating flashcard:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateFlashcard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { term, definition, confidenceLevel, keywords, collection_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE flashcards SET term = $1, definition = $2, confidenceLevel = $3, keywords = $4, collection_id = $5 WHERE id = $6 RETURNING *',
            [term, definition, confidenceLevel, keywords, collection_id, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (err) {
        console.error('Error updating flashcard:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateFlashcardConfidenceLevel = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // First, get the current confidenceLevel from the database
        const currentResult = await pool.query('SELECT confidenceLevel FROM flashcards WHERE id = $1', [id]);

        if (currentResult.rows.length > 0) {
            let confidenceLevel = currentResult.rows[0].confidencelevel;
            // console.log('cr[0]:', currentResult.rows[0].confidencelevel);
            confidenceLevel += 1;  // Increment by 1
            // console.log('updated confdence level:', confidenceLevel);
            // console.log('Updating flashcard:', id, 'with new confidence level:', confidenceLevel);

            // Then, update the confidenceLevel in the database
            const updateResult = await pool.query(
                'UPDATE flashcards SET confidenceLevel = $1 WHERE id = $2 RETURNING *',
                [confidenceLevel, id]
            );

            // console.log('Update result:', updateResult);

            if (updateResult.rows.length > 0) {
                res.json(updateResult.rows[0]);
            } else {
                res.status(404).json({ error: 'Flashcard not found' });
            }
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (err) {
        console.error('Error updating flashcard confidence level:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteFlashcard = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM flashcards WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount && result.rowCount > 0) {
            res.json({ message: 'Flashcard deleted successfully' });
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (err) {
        console.error('Error deleting flashcard:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
