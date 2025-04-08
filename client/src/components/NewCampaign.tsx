import React, { useState, useEffect, useRef } from 'react';
import { Campaign } from '../types/campaign';
import '../styles/NewCampaign.css';
import CampaignForm from './newcampaign/CampaignForm';
import axios from 'axios';
import useSuggestions from './newcampaign/hooks/useSuggestions';
import useTags from './newcampaign/hooks/useTags';

interface NewCampaignProps {
    onSubmit: (campaign: Campaign) => void;
    initialData?: Campaign;
}

const NewCampaign: React.FC<NewCampaignProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        keywords: '',
        bidAmount: '',
        campaignFund: '',
        status: true,
        town: 'Kraków',
        radius: '10'
    });

    const [userBalance, setUserBalance] = useState(0.00);
    const { suggestions, handleKeywordChange, handleKeywordFocus, handleKeywordBlur, handleKeywordKeyDown } = useSuggestions(formData, setFormData);
    const { tags, addTag, removeTag } = useTags(initialData?.keywords || []);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUserBalance = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/userBalance`);
                setUserBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching user balance:', error);
            }
        };
        fetchUserBalance();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                keywords: '',
                bidAmount: initialData.bidAmount?.toString() || '',
                campaignFund: initialData.campaignFund?.toString() || '',
                status: initialData.status || false,
                town: initialData.town || 'Kraków',
                radius: initialData.radius?.toString() || '10'
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const campaign: Campaign = {
            _id: '',
            name: formData.name,
            keywords: tags,
            bidAmount: parseFloat(formData.bidAmount),
            status: formData.status,
            town: formData.town,
            radius: parseInt(formData.radius),
            campaignFund: parseFloat(formData.campaignFund)
        };
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/campaigns`, campaign);
            alert('Campaign saved successfully!');
        } catch (error) {
            console.error('Error saving campaign:', error);
            alert('Failed to save campaign.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (name === 'campaignFund') {
            const newCampaignFund = parseFloat(value);
            setUserBalance(750.00 - (isNaN(newCampaignFund) ? 0 : newCampaignFund));
        }
    };

    const handleSave = async () => {
        const campaign: Campaign = {
            _id: initialData?._id || '',
            name: formData.name,
            keywords: tags,
            bidAmount: parseFloat(formData.bidAmount),
            status: formData.status,
            town: formData.town,
            radius: parseInt(formData.radius),
            campaignFund: parseFloat(formData.campaignFund)
        };

        try {
            if (campaign._id) {
                await axios.put(`${process.env.REACT_APP_API_URL}/campaigns/${campaign._id}`, campaign);
                alert('Campaign updated successfully!');
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/campaigns`, campaign);
                alert('Campaign saved successfully!');
            }
        } catch (error) {
            console.error('Error saving campaign:', error);
            alert('Failed to save campaign.');
        }
    };

    return (
        <div ref={suggestionsRef}>
            <CampaignForm
                formData={formData}
                userBalance={userBalance}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleKeywordChange={handleKeywordChange}
                handleKeywordFocus={handleKeywordFocus}
                handleKeywordBlur={handleKeywordBlur}
                handleKeywordKeyDown={handleKeywordKeyDown}
                suggestions={suggestions}
                addTag={addTag}
                removeTag={removeTag}
                tags={tags}
                handleSave={handleSave}
                setFormData={setFormData}
            />
        </div>
    );
};

export default NewCampaign;
