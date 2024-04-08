import { Request, Response } from 'express';
import { pool } from '../database/db';

export const getAllCollections = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM collections');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching collections:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
