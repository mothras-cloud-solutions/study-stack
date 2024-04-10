const fs = require('fs');
const { faker } = require('@faker-js/faker');

function generateFlashcards(count) {
    let flashcards = [];
    for (let i = 0; i < count; i++) {
        const term = faker.hacker.noun();
        const definition = faker.hacker.phrase();
        const confidenceLevel = 0;
        const keywords = faker.lorem.words().split(' ').slice(0, faker.number.int({ min: 1, max: 5 })).join(', ');
        const archived = 0;  // Add a default value for archived
        const starred = 0;   // Add a default value for starred

        flashcards.push({
            term,
            definition,
            confidenceLevel,
            keywords,
            archived,
            starred
        });
    }
    return flashcards;
}

const flashcardData = generateFlashcards(100);
const flashcardsFilePath = '/home/andrewpark0408/StudyStack/study-stack/server/database/scripts/flashcardsData.json';

fs.writeFile(flashcardsFilePath, JSON.stringify(flashcardData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        // console.log('Successfully wrote flashcard data to flashcardData.json');
    }
});
