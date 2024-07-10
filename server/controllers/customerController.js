import db from '../firebaseAdminConfig.js';

// Search customers by first or last name
export const searchCustomers = async (req, res) => {
    try {
        console.log('Received request to search customers');
        const { name } = req.query;
        console.log(`Searching customers with name: ${name}`);
        
        const customersRef = db.collection('customers');
        const firstNameQuery = customersRef.where('firstName', '==', name).get();
        const lastNameQuery = customersRef.where('lastName', '==', name).get();

        const [firstNameSnapshot, lastNameSnapshot] = await Promise.all([firstNameQuery, lastNameQuery]);

        if (firstNameSnapshot.empty && lastNameSnapshot.empty) {
            console.log('No matching customers found');
            return res.status(404).json({ message: 'No matching customers found' });
        }

        let customers = [];

        // Combine results from both queries
        firstNameSnapshot.forEach(doc => {
            customers.push({ id: doc.id, ...doc.data() });
        });

        lastNameSnapshot.forEach(doc => {
            customers.push({ id: doc.id, ...doc.data() });
        });

        // Remove duplicates
        customers = customers.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
        );

        console.log(`Found ${customers.length} matching customers`);
        res.json(customers);
    } catch (error) {
        console.error('Error searching customers:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Filter customers by company name
export const filterCustomers = async (req, res) => {
    try {
        console.log('Received request to filter customers by company');
        const { company } = req.query;
        console.log(`Filtering customers with company: ${company}`);

        const customersRef = db.collection('customers');
        const snapshot = await customersRef.where('companyName', '==', company).get();

        if (snapshot.empty) {
            console.log('No matching customers found');
            return res.status(404).json({ message: 'No matching customers found' });
        }

        let customers = [];
        snapshot.forEach(doc => {
            customers.push({ id: doc.id, ...doc.data() });
        });

        console.log(`Found ${customers.length} matching customers`);
        res.json(customers);
    } catch (error) {
        console.error('Error filtering customers:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Get list of all company names from database
export const getCompanyNames = async (req, res) => {
    try {
        console.log('Received request to get company names');
        const snapshot = await db.collection('customers').get();
        const companyNames = new Set();
        snapshot.forEach(doc => {
            companyNames.add(doc.data().companyName);
        });

        const companyNamesArray = Array.from(companyNames);
        console.log(`Found ${companyNamesArray.length} unique company names`);
        res.json(companyNamesArray);
    } catch (error) {
        console.error('Error fetching company names:', error);
        res.status(500).send('Error fetching company names');
    }
};
