import React from 'react';

interface StatusToggleProps {
    status: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StatusToggle: React.FC<StatusToggleProps> = ({ status, onChange }) => (
    <div className="form-group">
        <label>Status</label>
        <label className="toggle">
            <input type="checkbox" name="status" checked={status} onChange={onChange} />
            <span className="slider" />
        </label>
    </div>
);

export default StatusToggle;
