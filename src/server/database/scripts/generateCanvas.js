import fs from 'fs';
import { faker } from '@faker-js/faker';

function generateCanvasData(count) {
    let canvases = [];
    for (let i = 0; i < count; i++) {
        const id = faker.datatype.uuid();
        const name = `Canvas ${i + 1}`;
        const width = faker.datatype.number({ min: 100, max: 1000 });
        const height = faker.datatype.number({ min: 100, max: 1000 });
        const imageUrl = faker.image.imageUrl(width, height, 'canvas', true);
        const archived = faker.datatype.boolean(); // Add a random boolean for archived

        canvases.push({ id, name, width, height, imageUrl, archived });
    }
    return canvases;
}

const canvasData = generateCanvasData(100);
const canvasFilePath = '/home/andrewpark0408/StudyStack/study-stack/src/server/database/scripts/canvasData.json';

fs.writeFile(canvasFilePath, JSON.stringify(canvasData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        // console.log('Successfully wrote canvas data to canvasData.json');
    }
});
