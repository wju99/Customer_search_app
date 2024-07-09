import db from '../firebaseAdminConfig.js';

// Search customers by first or last name
export const searchCustomers = async (req, res) => {
    try {
        const { name } = req.query;
        const customersRef = db.collection('customers');
        
        // Create match first name and match last name queries
        const firstNameQuery = customersRef.where('firstName', '==', name).get();
        const lastNameQuery = customersRef.where('lastName', '==', name).get();

        const [firstNameSnapshot, lastNameSnapshot] = await Promise.all([firstNameQuery, lastNameQuery]);

        if (firstNameSnapshot.empty && lastNameSnapshot.empty) {
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

        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Filter customers by company name
export const filterCustomers = async (req, res) => {
    try {
        const { company } = req.query;
        const customersRef = db.collection('customers');
        const snapshot = await customersRef.where('companyName', '==', company).get();

        if (snapshot.empty) {
            return res.status(404).json({ message: 'No matching customers found' });
        }

        let customers = [];
        snapshot.forEach(doc => {
            customers.push({ id: doc.id, ...doc.data() });
        });

        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Get list of all company names from database
export const getCompanyNames = async (req, res) => {
    try {
      const snapshot = await db.collection('customers').get();
      const companyNames = new Set();
      snapshot.forEach(doc => {
        companyNames.add(doc.data().companyName);
      });
      res.json(Array.from(companyNames));
    } catch (error) {
      res.status(500).send('Error fetching company names');
    }
};
