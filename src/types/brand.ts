export interface BrandsRequest {
    page: number | null;
    pageSize: number | null;
}

export interface BrandRow {
    id: string | null;
    displayName: string | null;
    username: string | null; // User's full name
    field: string | null; // User's phone number
    gps: any; // User's gender, restricted to specific values
    imageUrl: string | null; // User's gender, restricted to specific values
    status: string;
    createAt: string | null;
}