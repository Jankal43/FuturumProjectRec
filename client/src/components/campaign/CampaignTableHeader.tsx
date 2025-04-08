import React from 'react';

const CampaignTableHeader: React.FC = () => (
    <div className="table-header">
            <div className="table-cell">Campaign Name</div>
            <div className="table-cell">Keywords</div>
            <div className="table-cell">Bid Amount</div>
            <div className="table-cell">Status</div>
            <div className="table-cell">Town</div>
            <div className="table-cell actions">Actions</div>
    </div>
);

export default CampaignTableHeader;
