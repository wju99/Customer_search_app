import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Resolve the path to the service account key JSON file
const serviceAccountPath = resolve('./serviceAccountKey.json');

// Read the JSON file synchronously
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://new-relic-take-home-42473.firebaseio.com'
});

// Initialize Firestore
const db = admin.firestore();
export default db;
