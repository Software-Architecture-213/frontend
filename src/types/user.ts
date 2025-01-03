export interface UpdateUserRequest {
    displayName: string | null; // User's full name
    email: string | null; // User's email address
    phoneNumber: string | null; // User's phone number
    dateOfBirth: string | null; // User's date of birth in YYYY-MM-DD format
    gender: "MALE" | "FEMALE"; // User's gender, restricted to specific values
}

export interface CreateUserRequest {
    displayName: string; // User's full name
    email: string; // User's email address
    password: string;
    phoneNumber: string; // User's phone number
    dateOfBirth: string; // User's date of birth in YYYY-MM-DD format
    role: "USER",
    gender: "MALE" | "FEMALE"; // User's gender, restricted to specific values
}

export interface UsersRequest {
    pageToken: string | null;
    maxResults: number | null;
}



export interface UserRow {
    userId: string | null;
    displayName: string | null; // User's full name
    email: string | null; // User's email address
    phoneNumber: string | null; // User's phone number
    dateOfBirth: string | null; // User's date of birth in YYYY-MM-DD format
    gender: "MALE" | "FEMALE"; // User's gender, restricted to specific values
    photoUrl: string | null; // User's gender, restricted to specific values
    disabled: boolean;
}
  