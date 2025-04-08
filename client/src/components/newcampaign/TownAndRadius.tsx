import React from 'react';
import CampaignFormRow from '../common/CampaignFormRow';
import CampaignFormGroup from '../common/CampaignFormGroup';

interface TownAndRadiusProps {
    formData: {
        town: string;
        radius: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const TownAndRadius: React.FC<TownAndRadiusProps> = ({ formData, handleChange }) => (
    <CampaignFormRow>
        <CampaignFormGroup label="Town">
            <select name="town" value={formData.town} onChange={handleChange} required>
                {['Kraków', 'Łódź', 'Warszawa', 'Poznań', 'Gdańsk', 'Katowice'].map(town => (
                    <option key={town} value={town}>{town}</option>
                ))}
            </select>
        </CampaignFormGroup>

        <CampaignFormGroup label="Radius (km)">
            <input type="number" name="radius" value={formData.radius || ''} onChange={handleChange} min="0" required />
        </CampaignFormGroup>
    </CampaignFormRow>
);

export default TownAndRadius;
