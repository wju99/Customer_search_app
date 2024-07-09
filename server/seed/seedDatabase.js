const db = require('../firebaseAdminConfig');
const faker = require('faker');

const seedDatabase = async () => {
    for (let i = 0; i < 50; i++) {
        const customer = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            companyName: faker.company.companyName()
        };
        await db.collection('customers').add(customer);
    }
    console.log('Database seeded');
};

seedDatabase();
