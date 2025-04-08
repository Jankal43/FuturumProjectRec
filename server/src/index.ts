import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { port, mongoUri, mongoDbName } from './config.js';
import router from './routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

if (!mongoUri) {
    throw new Error("mongoUri is not defined in environment variables");
}


mongoose.connect(mongoUri, { dbName: mongoDbName })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
