const fs = require('fs');
const { faker } = require('@faker-js/faker');

function generateCollections(count) {
    let collections = [];
    const subjectsList = ['Node.JS', 'CSS', 'JavaScript', 'TypeScript', 'React', 'PostgreSQL', 'Bulma', 'HTML', 'Express', 'MongoDB', 'Mongoose', 'Sequelize', 'SQL', 'NoSQL', 'RESTful APIs', 'GraphQL', 'Apollo', 'Jest', 'Mocha', 'Chai', 'Supertest', 'Enzyme', 'Jasmine', 'Karma', 'Webpack', ];

    for (let i = 0; i < count; i++) {
        const title = faker.commerce.productName();
        const description = faker.lorem.sentences();
        const subjects = faker.helpers.shuffle(subjectsList).slice(0, faker.datatype.number({ min: 1, max: 3 }));
        const user_id = 'HG0VmfQDiqVrmcRCOF3Iq6y2vA83';
        const created_from_id = null;

        collections.push({ title, description, subjects, user_id, created_from_id});
    }
    return collections;
}

const collectionData = generateCollections(5);
const collectionsFilePath = '/home/andrewpark0408/StudyStack/study-stack/server/database/scripts/collectionData.json';

fs.writeFile(collectionsFilePath, JSON.stringify(collectionData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        // console.log('Successfully wrote collection data to collectionData.json');
    }
});
