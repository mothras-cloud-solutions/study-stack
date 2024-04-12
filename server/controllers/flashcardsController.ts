import { Request, Response } from 'express';
import { pool } from '../database/db';

export const getAllFlashcards = async (_req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT f.*, c.canvas_front, c.canvas_back, col.title as deck_title
            FROM flashcards f
            LEFT JOIN canvases c ON f.id = c.flashcards_id
            LEFT JOIN collections col ON f.collection_id = col.id`);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching flashcards:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getFlashcardById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT f.*, c.canvas_front, c.canvas_back, col.title as deck_title
            FROM flashcards f
            LEFT JOIN canvases c ON f.id = c.flashcards_id
            LEFT JOIN collections col ON f.collection_id = col.id
            WHERE f.id = $1`,
            [id]
        );

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

export const getFlashcardsByCollection = async (req: Request, res: Response) => {
    const collectionId = req.params.collection_id;

    try {
        const result = await pool.query(`
            SELECT f.*, c.canvas_front, c.canvas_back, col.title as deck_title
            FROM flashcards f
            LEFT JOIN canvases c ON f.id = c.flashcards_id
            LEFT JOIN collections col ON f.collection_id = col.id
            WHERE f.collection_id = $1`,
            [collectionId]
        );

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching flashcards:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createFlashcard = async (req: Request, res: Response) => {
    const { term, definition, confidenceLevel, keywords, collection_id } = req.body;
    const canvas_front = '';
    const canvas_back = '';
    const archived = false;

    try {
        const result = await pool.query(
            'INSERT INTO flashcards (term, definition, confidenceLevel, keywords, collection_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [term, definition, confidenceLevel, keywords, collection_id]
        );
        const flashcards_id = result.rows[0].id
        const result2 = await pool.query(
            'INSERT INTO canvases (archived, canvas_front, canvas_back, flashcards_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [archived, canvas_front, canvas_back, flashcards_id]
        );
        const combinedResult = result.rows[0];
        combinedResult.canvas_front = result2.rows[0].canvas_front;
        combinedResult.canvas_back = result2.rows[0].canvas_back;
        res.status(201).json(combinedResult);
    } catch (err) {
        console.error('Error creating flashcard:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateFlashcard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { term, definition, keywords } = req.body;

    try {
        const result = await pool.query(
            'UPDATE flashcards SET term = $1, definition = $2, keywords = $3, edited_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
            [term, definition, keywords, id]
        );

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
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
            confidenceLevel += 1;  // Increment by 1

            // Then, update the confidenceLevel in the database
            const updateResult = await pool.query(
                'UPDATE flashcards SET confidenceLevel = $1 WHERE id = $2 RETURNING *',
                [confidenceLevel, id]
            );

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

export const swapStarredStatus = async (req: Request, res: Response) => {
    const { id } = req.params; // Assuming id is a string, no need to cast

    try {
        const result = await pool.query('SELECT starred FROM flashcards WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }

        let currentStarredStatus = result.rows[0].starred;
        console.log('Current starred status:', currentStarredStatus);
        console.log('typeof currentStarredStatus:', typeof currentStarredStatus);

        // Ensure currentStarredStatus is a boolean before toggling
        currentStarredStatus = Boolean(currentStarredStatus);
        console.log('Current starred status (as boolean):', currentStarredStatus);

        const newStarredStatus = currentStarredStatus ? 0 : 1; // Toggle the starred status
        console.log('New starred status:', newStarredStatus);
        console.log('typeof newStarredStatus:', typeof newStarredStatus);

        // Update the database without returning any rows
        await pool.query('UPDATE flashcards SET starred = $1 WHERE id = $2', [newStarredStatus.toString(), id]);

        res.json({ success: true, message: 'Starred status updated successfully', newStarredStatus });
    } catch (error) {
        console.error('Error toggling starred status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const swapArchivedStatus = async (req: Request, res: Response) => {
    const { id } = req.params; // Assuming id is a string, no need to cast

    try {
        const currentResult = await pool.query('SELECT archived FROM flashcards WHERE id = $1', [id]);
        if (currentResult.rows.length === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }

        let currentArchivedStatus = currentResult.rows[0].archived;
        console.log('Current archived status:', currentArchivedStatus);

        // Ensure currentArchivedStatus is a boolean before toggling
        currentArchivedStatus = Boolean(currentArchivedStatus);
        console.log('Current archived status (as boolean):', currentArchivedStatus);

        const newArchivedStatus = currentArchivedStatus ? 0 : 1; // Toggle the archived status
        console.log('New archived status:', newArchivedStatus);

        // Update the database without returning any rows
        await pool.query('UPDATE flashcards SET archived = $1 WHERE id = $2', [newArchivedStatus.toString(), id]);

        res.json({ success: true, message: 'Archived status updated successfully', newArchivedStatus });
    } catch (error) {
        console.error('Error toggling archived status:', error);
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