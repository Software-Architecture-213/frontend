export interface GameRow {
    _id: string;
    name: string | null;
    type: string; // User's full name
    description: string; // User's full name
    difficulty: string;
    imageUrl: string | null; // User's gender, restricted to specific values
    createdAt: string | null;
    modifiedAt: string | null;
}
