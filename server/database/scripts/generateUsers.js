import fs from 'fs';
import { faker } from '@faker-js/faker';

function generateUsers(count) {
    let users = [];
    const roles = ['admin', 'student', 'teacher'];

    for (let i = 0; i < count; i++) {
        users.push({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: roles[faker.datatype.number({ min: 0, max: roles.length - 1 })]
        });
    }
    return users;
}

const userData = generateUsers(100);
const usersFilePath = '/home/andrewpark0408/StudyStack/study-stack/server/database/scripts/userData.json';

fs.writeFile(usersFilePath, JSON.stringify(userData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        // console.log('Successfully wrote user data to userData.json');
    }
});
