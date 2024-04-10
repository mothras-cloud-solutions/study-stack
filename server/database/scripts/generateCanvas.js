const fs = require('fs');
const { faker } = require('@faker-js/faker');

function generateCanvasData(count) {
    let canvases = [];
    for (let i = 0; i < count; i++) {
        const archived = false;
        const canvas_front = '';
        const canvas_back = '';

        canvases.push({
            archived,
            canvas_front,
            canvas_back
        });
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
