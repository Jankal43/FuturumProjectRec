import React from 'react';

const CampaignKeywords: React.FC<{ keywords: string[] }> = ({ keywords }) => (
    <div className="keywords">
        {keywords.map((keyword, idx) => (
            <span key={idx} className="keyword">{keyword}</span>
        ))}
    </div>
);

export default CampaignKeywords;
