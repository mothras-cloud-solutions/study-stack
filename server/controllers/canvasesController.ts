import { Request, Response } from 'express';
import { pool } from '../database/db';

export const getAllCanvases = async (_req: any, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM canvases');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching canvases:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getCanvasById = async (req: Request, res: Response) => {
    const { flashcards_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM canvases WHERE flashcards_id = $1', [flashcards_id]);
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

// export const createCanvasFront = async (req: Request, res: Response) => {
//     const { name, width, height, imageUrl, archived, flashcards_id } = req.body;
//     try {
//         const result = await pool.query(
//             'INSERT INTO canvases (name, width, height, canvas_front, archived, flashcards_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
//             [name, width, height, imageUrl, archived, flashcards_id]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (err) {
//         console.error('Error creating canvas front:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
// export const createCanvas = async (req: Request, res: Response) => {
//     const { name, width, height, imageUrl, archived, user_id } = req.body;
//     try {
//         const result = await pool.query(
//             'INSERT INTO canvases (name, width, height, imageUrl, archived, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
//             [name, width, height, imageUrl, archived, user_id]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (err) {
//         console.error('Error creating canvas:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// export const updateCanvas = async (req: Request, res: Response) => {
//     const { flashcards_id } = req.params;
//     const { name, width, height, imageUrl, archived, user_id } = req.body;
//     try {
//         const result = await pool.query(
//             'UPDATE canvases SET name = $1, width = $2, height = $3, imageUrl = $4, archived = $5, user_id = $6 WHERE id = $7 RETURNING *',
//             [name, width, height, imageUrl, archived, user_id, flashcards_id]
//         );
//         if (result.rows.length > 0) {
//             res.json(result.rows[0]);
//         } else {
//             res.status(404).json({ error: 'Canvas not found' });
//         }
//     } catch (err) {
//         console.error('Error updating canvas:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

export const updateCanvasFront = async (req: Request, res: Response) => {
    const { flashcards_id } = req.params;
    const { canvas_front } = req.body;
    try {
        const result = await pool.query('UPDATE canvases SET canvas_front = $1 WHERE flashcards_id = $2 RETURNING *', [canvas_front, flashcards_id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Canvas not found' });
        }
    } catch (err) {
        console.error('Error updating canvas front:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateCanvasBack = async (req: Request, res: Response) => {
    const { flashcards_id } = req.params;
    const { canvas_back } = req.body;
    try {
        const result = await pool.query('UPDATE canvases SET canvas_back = $1 WHERE flashcards_id = $2 RETURNING *', [canvas_back, flashcards_id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Canvas not found' });
        }
    } catch (err) {
        console.error('Error updating canvas back:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteCanvas = async (req: Request, res: Response) => {
    const { flashcards_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM canvases WHERE flashcards_id = $1 RETURNING *', [flashcards_id]);
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

export const swapCanvasArchived = async (req: Request, res: Response) => {
    const { flashcards_id } = req.params;
    try {
        const result = await pool.query('UPDATE canvases SET archived = NOT archived WHERE flashcards_id = $1 RETURNING *', [flashcards_id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Canvas not found' });
        }
    } catch (err) {
        console.error('Error swapping canvas archived status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};