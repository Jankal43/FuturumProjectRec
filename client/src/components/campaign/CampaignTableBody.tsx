import React from 'react';
import { Campaign } from '../../types/campaign';
import CampaignRow from './CampaignRow';

interface CampaignTableBodyProps {
    campaigns: Campaign[];
    onDelete: (index: number) => void;
    onStatusChange: (index: number) => void;
    onEdit: (campaign: Campaign) => void;
}

const CampaignTableBody: React.FC<CampaignTableBodyProps> = ({ campaigns, onDelete, onStatusChange, onEdit }) => (
    <div className="table-body">
        {campaigns.map((campaign, index) => (
            <CampaignRow
                key={index}
                campaign={campaign}
                index={index}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
                onEdit={onEdit}
            />
        ))}
    </div>
);

export default CampaignTableBody;
