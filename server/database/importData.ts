// Import necessary modules
import fs from 'fs';
import path from 'path';

import { pool, insertData } from './db'; // Adjust this path to the correct location of your db module

// Function to load JSON data from a file
const loadJsonFile = (filePath: string) => {
    try {
        console.log('dirnmae',__dirname)
        console.log('filepath',filePath)
        const data = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
};

// Main function to orchestrate the data import process
const main = async () => {
    const usersData = loadJsonFile('./scripts/userData.json');
    const collectionsData = loadJsonFile('./scripts/collectionData.json');
    const flashcardsData = loadJsonFile('./scripts/flashcardsData.json');
    const canvasesData = loadJsonFile('./scripts/canvasData.json');

    // Insert users data
    await insertData(usersData, 'users', ['username', 'email', 'password', 'role']);

    // Insert collections data
    const userRows = await pool.query('SELECT id FROM users');
    const userIds = userRows.rows.map(row => row.id);
    for (const collection of collectionsData) {
        const user_id = userIds[Math.floor(Math.random() * userIds.length)];
        await pool.query(`INSERT INTO collections (title, description, subjects, user_id) VALUES ($1, $2, $3, $4)`, [collection.title, collection.description, collection.subjects, user_id]);
    }

    // Insert flashcards data
    const collectionRows = await pool.query('SELECT id FROM collections');
    const collectionIds = collectionRows.rows.map(row => row.id);
    for (const flashcard of flashcardsData) {
        const collection_id = collectionIds[Math.floor(Math.random() * collectionIds.length)];
        await pool.query(`INSERT INTO flashcards (term, definition, confidenceLevel, keywords, archived, starred, collection_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [flashcard.term, flashcard.definition, flashcard.confidenceLevel, flashcard.keywords, flashcard.archived, flashcard.starred, collection_id]);
    }

    // Insert canvases data
    const flashcardRows = await pool.query('SELECT id FROM flashcards');
    const flashcardIds = flashcardRows.rows.map(row => row.id);
    for (const canvas of canvasesData) {
        const flashcards_id = flashcardIds[Math.floor(Math.random() * flashcardIds.length)];
        await pool.query(`INSERT INTO canvases (id, archived, canvas_data, flashcards_id) VALUES ($1, $2, $3, $4)`, [canvas.id, canvas.archived, canvas.canvas_data, flashcards_id]);
    }
};

// Execute the main function and catch any errors
main().catch(console.error);
