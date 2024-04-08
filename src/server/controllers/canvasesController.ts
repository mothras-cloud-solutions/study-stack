import { Request, Response } from 'express';
import { pool } from '../database/db';

export const getAllCanvases = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM canvases');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching canvases:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
