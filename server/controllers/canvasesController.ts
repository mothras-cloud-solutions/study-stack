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

export const getCanvasById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM canvases WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Canvas not found' });
        }
    } catch (err) {
        console.error('Error fetching canvas:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createCanvas = async (req: Request, res: Response) => {
    const { name, width, height, imageUrl, archived, user_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO canvases (name, width, height, imageUrl, archived, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, width, height, imageUrl, archived, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating canvas:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateCanvas = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, width, height, imageUrl, archived, user_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE canvases SET name = $1, width = $2, height = $3, imageUrl = $4, archived = $5, user_id = $6 WHERE id = $7 RETURNING *',
            [name, width, height, imageUrl, archived, user_id, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Canvas not found' });
        }
    } catch (err) {
        console.error('Error updating canvas:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteCanvas = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM canvases WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Canvas deleted successfully' });
        } else {
            res.status(404).json({ error: 'Canvas not found' });
        }
    } catch (err) {
        console.error('Error deleting canvas:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
