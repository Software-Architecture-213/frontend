export interface UpdateUserRequest {
    displayName: string | null; // User's full name
    email: string | null; // User's email address
    phoneNumber: string | null; // User's phone number
    dateOfBirth: string | null; // User's date of birth in YYYY-MM-DD format
    gender: "MALE" | "FEMALE"; // User's gender, restricted to specific values
}
  