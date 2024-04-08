import fs from 'fs';
import { faker } from '@faker-js/faker';

function generateCollections(count) {
    let collections = [];
    const subjectsList = ['English', 'CSS', 'JavaScript'];

    for (let i = 0; i < count; i++) {
        const title = faker.commerce.productName();
        const description = faker.lorem.sentences();
        const subjects = faker.helpers.shuffle(subjectsList).slice(0, faker.datatype.number({ min: 1, max: 3 }));

        collections.push({ title, description, subjects });
    }
    return collections;
}

const collectionData = generateCollections(100);
const collectionsFilePath = '/home/andrewpark0408/StudyStack/study-stack/server/database/scripts/collectionData.json';

fs.writeFile(collectionsFilePath, JSON.stringify(collectionData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        // console.log('Successfully wrote collection data to collectionData.json');
    }
});
