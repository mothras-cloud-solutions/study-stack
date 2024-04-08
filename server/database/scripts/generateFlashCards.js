import fs from 'fs';
import { faker } from '@faker-js/faker';

function generateFlashcards(count) {
    let flashcards = [];
    for (let i = 0; i < count; i++) {
        const term = faker.hacker.noun();
        const definition = faker.hacker.phrase();
        const confidenceLevel = 0;
        const keywords = faker.random.words().split(' ').slice(0, faker.datatype.number({ min: 1, max: 5 })).join(', ');

        flashcards.push({
            term,
            definition,
            confidenceLevel,
            keywords,
        });
    }
    return flashcards;
}

const flashcardData = generateFlashcards(100);
const flashcardsFilePath = '/home/andrewpark0408/StudyStack/study-stack/server/database/scripts/flashcardsData.json';  // Update this path as necessary

fs.writeFile(flashcardsFilePath, JSON.stringify(flashcardData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        // console.log('Successfully wrote flashcard data to flashcardData.json');
    }
});