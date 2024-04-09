const fs = require('fs');
const { faker } = require('@faker-js/faker');

function generateCanvasData(count) {
    let canvases = [];
    for (let i = 0; i < count; i++) {
        const id = faker.datatype.uuid();
        const archived = faker.datatype.boolean();
        const flashcards_id = faker.number.int(); // Example, assuming you have such IDs in your flashcards table
        const canvas_data = JSON.stringify({
            name: `Canvas ${i + 1}`,
            width: faker.number.int({ min: 100, max: 1000 }),
            height: faker.number.int({ min: 100, max: 1000 }),
            imageUrl: faker.image.imageUrl()
        });

        canvases.push({ id, archived, canvas_data, flashcards_id });
    }
    return canvases;
}

const canvasData = generateCanvasData(100);
const canvasFilePath = '/home/andrewpark0408/StudyStack/study-stack/server/database/scripts/canvasData.json';

fs.writeFile(canvasFilePath, JSON.stringify(canvasData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Successfully wrote canvas data to canvasData.json');
    }
});
