import React, { useRef } from 'react';
import CampaignFormRow from '../common/CampaignFormRow';
import CampaignFormGroup from '../common/CampaignFormGroup';
import BalanceInfo from './BalanceInfo';
import StatusToggle from './StatusToggle';
import KeywordsInput from './KeywordsInput';
import TownAndRadius from './TownAndRadius';

interface CampaignFormProps {
    formData: {
        name: string;
        keywords: string;
        bidAmount: string;
        campaignFund: string;
        status: boolean;
        town: string;
        radius: string;
    };
    userBalance: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeywordFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleKeywordBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleKeywordKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    suggestions: string[];
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    tags: string[];
    handleSave: () => void;
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        keywords: string;
        bidAmount: string;
        campaignFund: string;
        status: boolean;
        town: string;
        radius: string;
    }>>;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
    formData, userBalance, handleChange, handleSubmit, handleKeywordChange, handleKeywordFocus, handleKeywordBlur, handleKeywordKeyDown, suggestions, addTag, removeTag, tags, handleSave, setFormData
}) => {
    return (
        <form className="new-campaign-form" onSubmit={handleSubmit}>
            <CampaignFormGroup label="Campaign Name">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </CampaignFormGroup>

            <KeywordsInput
                formData={formData}
                handleKeywordChange={handleKeywordChange}
                handleKeywordFocus={handleKeywordFocus}
                handleKeywordBlur={handleKeywordBlur}
                handleKeywordKeyDown={handleKeywordKeyDown}
                suggestions={suggestions}
                addTag={addTag}
                removeTag={removeTag}
                tags={tags}
                setFormData={setFormData}
            />

            <CampaignFormRow>
                <CampaignFormGroup label="Bid Amount">
                    <input type="number" name="bidAmount" value={formData.bidAmount || ''} onChange={handleChange} step="0.01" min="0" required />
                </CampaignFormGroup>

                <CampaignFormGroup label="Campaign Fund">
                    <input 
                        type="number" 
                        name="campaignFund" 
                        value={formData.campaignFund || ''} 
                        onChange={handleChange} 
                        step="0.01" 
                        min="0" 
                        required 
                    />
                    <BalanceInfo userBalance={userBalance} />
                </CampaignFormGroup>
            </CampaignFormRow>

            <CampaignFormRow>
                <StatusToggle status={formData.status} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} />
            </CampaignFormRow>

            <TownAndRadius formData={formData} handleChange={handleChange} />

            <button type="button" className="save-button" onClick={handleSave}>Save</button>
        </form>
    );
};

export default CampaignForm;

