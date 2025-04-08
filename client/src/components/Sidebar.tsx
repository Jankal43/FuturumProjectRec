import React from 'react';

interface SidebarProps {
    activeTab: 'campaigns' | 'new';
    setActiveTab: (tab: 'campaigns' | 'new') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    return (
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
    );
};

export default Sidebar;
