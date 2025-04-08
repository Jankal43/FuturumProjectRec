import React from 'react';

interface CampaignFormRowProps {
    children: React.ReactNode;
}

const CampaignFormRow: React.FC<CampaignFormRowProps> = ({ children }) => (
    <div className="form-row">
        {children}
    </div>
);

export default CampaignFormRow;
