
export interface CampaignRow {
    id: string;
    name: string | null;
    description: string; // User's full name
    imageUrl: string | null; // User's gender, restricted to specific values
    brandId: string | null;
    brandName: string | null;
    budget: number | null;
    remainingBudget: number | null;
    status: string | null;
    startDate: string | null;
    endDate: string | null;
}