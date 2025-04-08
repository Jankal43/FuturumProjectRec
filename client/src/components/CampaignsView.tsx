import React from 'react';
import { Campaign } from '../types/campaign';
import Campaigns from './Campaigns';

interface CampaignsViewProps {
    campaigns: Campaign[];
    onDelete: (index: number) => void;
    onEdit: (campaign: Campaign) => void;
}

const CampaignsView: React.FC<CampaignsViewProps> = ({ campaigns, onDelete, onEdit }) => {
    return (
        <>
            <h2>Campaigns</h2>
            <Campaigns 
                campaigns={campaigns} 
                onDelete={onDelete} 
                onEdit={onEdit} 
            />
        </>
    );
};

export default CampaignsView;
