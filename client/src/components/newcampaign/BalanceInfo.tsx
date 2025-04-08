import React from 'react';

interface BalanceInfoProps {
    userBalance: number;
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({ userBalance }) => (
    <div className="balance-info">
        User balance: ${userBalance.toFixed(2)}
    </div>
);

export default BalanceInfo;
