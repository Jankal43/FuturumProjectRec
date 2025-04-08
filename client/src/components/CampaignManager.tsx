import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Campaign } from '../types/campaign';
import Campaigns from './Campaigns';
import NewCampaign from './NewCampaign';
import '../styles/CampaignManager.css';

const CampaignManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'campaigns' | 'new'>('campaigns');
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

    const fallbackCampaign: Campaign = {
        _id: 'fallback',
        name: 'Default Campaign',
        keywords: ['default', 'backup'],
        bidAmount: 1.0,
        status: true,
        town: 'Fallback Town',
        radius: 10, // Dodano brakującą właściwość
        campaignFund: 1000, // Dodano brakującą właściwość
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/campaigns`)
            .then(response => setCampaigns(response.data))
            .catch(error => {
                console.error('Error fetching campaigns:', error);
                setCampaigns([fallbackCampaign]);
            });
    }, []);

    const handleAddCampaign = (campaign: Campaign) => {
        axios.post(`${process.env.REACT_APP_API_URL}/campaigns`, campaign)
            .then(response => {
                setCampaigns([...campaigns, response.data]);
                setActiveTab('campaigns');
            })
            .catch(error => console.error('Error adding campaign:', error));
    };

    const handleDeleteCampaign = (index: number) => {
        const campaignToDelete = campaigns[index];
        axios.delete(`${process.env.REACT_APP_API_URL}/campaigns/${campaignToDelete._id}`)
            .then(() => {
                setCampaigns(campaigns.filter((_, i) => i !== index));
            })
            .catch(error => console.error('Error deleting campaign:', error));
    };

    const handleEditCampaign = (updatedCampaign: Campaign) => {
        if (!updatedCampaign._id) {
            console.error('Invalid campaign data:', updatedCampaign);
            return;
        }
        axios.put(`${process.env.REACT_APP_API_URL}/campaigns/${updatedCampaign._id}`, updatedCampaign)
            .then(response => {
                setCampaigns(campaigns.map(c => c._id === updatedCampaign._id ? response.data : c));
                setActiveTab('campaigns');
                setEditingCampaign(null); // Reset edytowanej kampanii
            })
            .catch(error => console.error('Error updating campaign:', error));
    };

    const handleStartEditing = (campaign: Campaign) => {
        setEditingCampaign(campaign);
        setActiveTab('new');
    };

    return (
        <div className="campaign-manager">
            <nav className="sidebar">
                <h1>Campaign Manager</h1>
                <ul>
                    <li>
                        <button
                            className={activeTab === 'campaigns' ? 'active' : ''}
                            onClick={() => setActiveTab('campaigns')}
                        >
                            Campaigns
                        </button>
                    </li>
                    <li>
                        <button
                            className={activeTab === 'new' ? 'active' : ''}
                            onClick={() => setActiveTab('new')}
                        >
                            New Campaign
                        </button>
                    </li>
                </ul>
            </nav>
            <main className="content">
                {activeTab === 'campaigns' ? (
                    <>
                        <h2>Campaigns</h2>
                        <Campaigns
                            campaigns={campaigns}
                            onDelete={handleDeleteCampaign}
                            onEdit={handleStartEditing}
                        />
                    </>
                ) : (
                    <>
                        <h2>{editingCampaign ? 'Edit Campaign' : 'New Campaign'}</h2>
                        <NewCampaign
                            onSubmit={editingCampaign ? handleEditCampaign : handleAddCampaign}
                            initialData={editingCampaign || undefined}
                        />
                    </>
                )}
            </main>
        </div>
    );
};

export default CampaignManager;
