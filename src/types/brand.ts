export interface BrandsRequest {
    page: number | null;
    pageSize: number | null;
}

export interface BrandRow {
    id: string;
    displayName: string | null;
    username: string; // User's full name
    field: string | null; // User's phone number
    gps: GPS2; // User's gender, restricted to specific values
    imageUrl: string | null; // User's gender, restricted to specific values
    status: string;
    headQuarter: string | null;
    createAt: string | null;
}

export interface CreateBrandRequest {
    username: string;
    password: string,
    displayName: string,
    field: string,
    gps: GPS2,
}

export interface UpdateBrandRequest {
    // username: string | null;
    displayName: string | null,
    field: string | null,
    // gps: GPS2,
}


export interface GPS {
    lat: number; // Latitude
    lng: number; // Longitude
}
export interface GPS2 {
  latitude: number; // Latitude
  longitude: number; // Longitude
}

export interface IChartData{
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor?: string[];
        borderWidth: number;
    }[];
}


export interface PaymentRow {
    orderId: string,
    brandName: string | null,
    brandImageUrl: string | null,
    createdAt: string,
    currency: string,
    amount: number,
}