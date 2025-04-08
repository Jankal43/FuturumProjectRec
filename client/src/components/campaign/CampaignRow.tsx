import React from 'react';
import { Campaign } from '../../types/campaign';
import CampaignKeywords from './CampaignKeywords';

const CampaignRow: React.FC<{ campaign: Campaign, index: number, onDelete: (index: number) => void, onStatusChange: (index: number) => void, onEdit: (campaign: Campaign) => void }> = ({ campaign, index, onDelete, onStatusChange, onEdit }) => (
    <div className="table-row">
        <div className="table-cell">{campaign.name}</div>
        <CampaignKeywords keywords={campaign.keywords} />
        <div className="table-cell">${campaign.bidAmount.toFixed(2)}</div>
        <div className="table-cell">
            <label className="toggle">
                <input
                    type="checkbox"
                    checked={campaign.status}
                    disabled
                />
                <span className="slider" />
            </label>
        </div>
        <div className="table-cell">{campaign.town}</div>
        <div className="table-cell actions">
            <button 
                onClick={() => onEdit(campaign)} 
                className="edit-button" 
                title="Edit this campaign"
            >
                <img src="/edit.svg" alt="Edit" />
            </button>
            <button 
                onClick={() => onDelete(index)} 
                className="delete-button" 
                title="Delete this campaign"
            >
                <img src="/rubbish.svg" alt="Delete" />
            </button>
        </div>
    </div>
);

export default CampaignRow;

