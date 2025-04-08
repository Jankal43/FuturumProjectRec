import React, { useRef } from 'react';
import CampaignFormGroup from '../common/CampaignFormGroup';

interface KeywordsInputProps {
    formData: {
        keywords: string;
    };
    handleKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeywordFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleKeywordBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleKeywordKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    suggestions: string[];
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    tags: string[];
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

const KeywordsInput: React.FC<KeywordsInputProps> = ({
    formData, handleKeywordChange, handleKeywordFocus, handleKeywordBlur, handleKeywordKeyDown, suggestions, addTag, removeTag, tags, setFormData
}) => {
    const suggestionsRef = useRef<HTMLDivElement>(null);

    return (
        <CampaignFormGroup label="Keywords">
            <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleKeywordChange}
                onFocus={handleKeywordFocus}
                onBlur={handleKeywordBlur}
                onKeyDown={(e) => {
                    handleKeywordKeyDown(e);
                    if (e.key === 'Enter' && formData.keywords.trim()) {
                        addTag(formData.keywords.trim());
                        setFormData((prev) => ({ ...prev, keywords: '' }));
                    }
                }}
                placeholder=""
            />
            {suggestions.length > 0 && (
                <div className="suggestions-menu" ref={suggestionsRef}>
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="suggestion-item" onClick={() => {
                            addTag(suggestion);
                            setFormData((prev) => ({ ...prev, keywords: '' }));
                        }}>
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
            <div className="tags-container">
                {tags.map((tag, index) => (
                    <div key={index} className="tag">
                        {tag} <span className="remove-tag" onClick={() => removeTag(tag)}>x</span>
                    </div>
                ))}
            </div>
        </CampaignFormGroup>
    );
};

export default KeywordsInput;
