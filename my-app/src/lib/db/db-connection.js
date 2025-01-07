import { MongoClient } from "mongodb";
import { MONGODB_URI } from "$env/static/private";

let client = null;
let db = null;

export async function initDb() {
    try {
        console.log('DB: Initializing database connection');
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db('zooDB');
        console.log('DB: Successfully connected to MongoDB');
    } catch (error) {
        console.error('DB: Error connecting to MongoDB:', error);
        throw error;
    }
}

// Internal function, not exported
async function getDb() {
    if (!db) {
        await initDb();
    }
    return db;
}

export async function getCollection(name) {
    if (!db) {
        await initDb();
    }
    return db.collection(name);
} 