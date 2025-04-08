import React from 'react';

interface CampaignFormGroupProps {
    label: string;
    children: React.ReactNode;
}

const CampaignFormGroup: React.FC<CampaignFormGroupProps> = ({ label, children }) => (
    <div className="form-group">
        <label>{label}</label>
        {children}
    </div>
);

export default CampaignFormGroup;
