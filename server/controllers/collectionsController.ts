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

export const getCollectionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM collections WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Collection not found' });
        }
    } catch (err) {
        console.error('Error fetching collection:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createCollection = async (req: Request, res: Response) => {
    const { title, description, subjects, user_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO collections (title, description, subjects, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, subjects, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating collection:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateCollection = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, subjects, user_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE collections SET title = $1, description = $2, subjects = $3, user_id = $4 WHERE id = $5 RETURNING *',
            [title, description, subjects, user_id, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Collection not found' });
        }
    } catch (err) {
        console.error('Error updating collection:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteCollection = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM collections WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Collection deleted successfully' });
        } else {
            res.status(404).json({ error: 'Collection not found' });
        }
    } catch (err) {
        console.error('Error deleting collection:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};