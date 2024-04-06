// Import necessary modules
import fs from 'fs';
import path from 'path';
// import { fileURLToPath } from 'url';
import { insertData } from './db'; // Adjust this path to the correct location of your db module

// Compute __dirname equivalent in ES module scope
// __dirname = process.cwd();
// console.log('dirnmae',__dirname);
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
    const usersData = loadJsonFile('../scripts/userData.json');
    const collectionsData = loadJsonFile('../scripts/collectionData.json');
    const flashcardsData = loadJsonFile('../scripts/flashcardData.json');
    const canvasesData = loadJsonFile('../scripts/canvasData.json');

    // Ensure the column names match exactly with your database schema
    await insertData(usersData, 'users', ['username', 'email', 'password', 'role']);
    await insertData(collectionsData, 'collections', ['title', 'description', 'subjects', 'user_id']);
    await insertData(flashcardsData, 'flashcards', ['term', 'definition', 'confidenceLevel', 'keywords', 'collection_id']);
    await insertData(canvasesData, 'canvases', ['id', 'name', 'width', 'height', 'imageUrl', 'user_id']);
};

// Execute the main function and catch any errors
main().catch(console.error);
