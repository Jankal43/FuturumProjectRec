import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 5000;
export const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

// Dodaj konfigurację dla MongoDB
export const mongoDbName = process.env.MONGO_DB_NAME || 'futurumproject';
export const mongoCollectionName = process.env.MONGO_COLLECTION_NAME || 'campaign';

