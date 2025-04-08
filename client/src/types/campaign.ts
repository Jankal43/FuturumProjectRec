export interface Campaign {
    _id: string;
    name: string;
    keywords: string[];
    bidAmount: number;
    status: boolean;
    town: string;
    radius: number;
    campaignFund: number;
}
