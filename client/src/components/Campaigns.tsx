import React, { useState, useEffect } from 'react';
import { Campaign } from '../types/campaign';
import '../styles/Campaigns.css';
import CampaignTableHeader from './campaign/CampaignTableHeader';
import CampaignTableBody from './campaign/CampaignTableBody';

interface CampaignsProps {
    campaigns: Campaign[];
    onDelete: (index: number) => void;
    onEdit: (campaign: Campaign) => void;
}

const Campaigns: React.FC<CampaignsProps> = ({ campaigns, onDelete, onEdit }) => {
    const [campaignList, setCampaignList] = useState(campaigns);

    useEffect(() => {
        setCampaignList(campaigns);
    }, [campaigns]);

    const handleStatusChange = (index: number) => {
        const updatedCampaigns = [...campaignList];
        updatedCampaigns[index].status = !updatedCampaigns[index].status;
        setCampaignList(updatedCampaigns);
    };

    const handleDelete = (index: number) => {
        const updatedCampaigns = campaignList.filter((_, i) => i !== index);
        setCampaignList(updatedCampaigns);
        onDelete(index);
    };

    return (
        <div className="campaigns-table">
            <CampaignTableHeader />
            <CampaignTableBody 
                campaigns={campaignList} 
                onDelete={handleDelete} 
                onStatusChange={handleStatusChange} 
                onEdit={onEdit} 
            />
        </div>
    );
};

export default Campaigns;

