import React from 'react';
import { Campaign } from '../types/campaign';
import NewCampaign from './NewCampaign';

interface NewCampaignViewProps {
    onSubmit: (campaign: Campaign) => void;
    initialData?: Campaign;
}

const NewCampaignView: React.FC<NewCampaignViewProps> = ({ onSubmit, initialData }) => {
    return (
        <>
            <h2>{initialData ? 'Edit Campaign' : 'New Campaign'}</h2>
            <NewCampaign 
                onSubmit={onSubmit} 
                initialData={initialData} 
            />
        </>
    );
};

export default NewCampaignView;
