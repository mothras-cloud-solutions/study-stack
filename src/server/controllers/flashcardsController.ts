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
