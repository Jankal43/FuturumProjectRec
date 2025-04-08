import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { mongoCollectionName } from './config.js';
import cors from 'cors';

// Create the router
const router = express.Router();
router.use(cors());

interface Campaign {
    name: string;
    keywords: string[];
    bidAmount: number;
    status: boolean;
    town: string;
    radius: number;
}

const campaignSchema = new mongoose.Schema({
    name: String,
    keywords: [String],
    bidAmount: Number,
    status: Boolean,
    town: String,
    radius: Number,
}, { collection: mongoCollectionName });

const CampaignModel = mongoose.model<Campaign & mongoose.Document>('Campaign', campaignSchema);

const userBalance = 750.00;

// Route handlers
router.get('/', (req: Request, res: Response) => {
    console.log('Received GET request');
    res.send('Hello World');
});

router.get('/campaigns', async (req: Request, res: Response) => {
    console.log('Received GET request');
    try {
        const campaigns = await CampaignModel.find();
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
});
//@ts-ignore
router.post('/campaigns', async (req: Request, res: Response) => {
    console.log('Received POST request with data:', req.body);
    try {
        const { _id, ...campaignData } = req.body;
        if (
            !campaignData.name || 
            !Array.isArray(campaignData.keywords) || 
            typeof campaignData.bidAmount !== 'number' || 
            typeof campaignData.status !== 'boolean' || 
            !campaignData.town || 
            typeof campaignData.radius !== 'number' || 
            typeof campaignData.campaignFund !== 'number'
        ) {
            console.error('Validation failed:', req.body);
            return res.status(400).json({ error: 'Invalid data format' });
        }

        const newCampaign = new CampaignModel(campaignData); // Użyj danych bez `_id`
        await newCampaign.save();
        res.status(201).json(newCampaign);
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(400).json({ error: 'Failed to create campaign' });
    }
});

// @ts-ignore
router.delete('/campaigns/:id', async (req: Request, res: Response) => {
    console.log('Received DELETE request');
    try {
        const { id } = req.params;
        const deletedCampaign = await CampaignModel.findByIdAndDelete(id);
        if (!deletedCampaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete campaign' });
    }
});
// @ts-ignore
router.put('/campaigns/:id', async (req: Request, res: Response) => {
    console.log('Received PUT request');
    try {
        const { id } = req.params;
        const { _id, ...campaignData } = req.body; // Ignorujemy `_id` z danych
        const updatedCampaign = await CampaignModel.findByIdAndUpdate(id, campaignData, { new: true });
        if (!updatedCampaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(updatedCampaign);
    } catch (error) {
        console.error('Error updating campaign:', error);
        res.status(400).json({ error: 'Failed to update campaign' });
    }
});

router.get('/userBalance', (req: Request, res: Response) => {
    console.log('Received GET request for user balance');
    res.json({ balance: userBalance });
});


export default router;

