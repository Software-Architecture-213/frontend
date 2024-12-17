import axiosInstance from "../axiosInstance";

export const identityAuthApi = {
    login: async (email: string, password: string) => {
      return axiosInstance.post("api/identity/auth/login", { email, password });
    },
    register: async ( displayName: string, email: string,  password: string, 
        role: string, phoneNumber: string,  dateOfBirth: string, gender: string) => {
        return axiosInstance.post("api/identity/auth/register", {
          displayName,
          email,
          password,
          role,
          phoneNumber,
          dateOfBirth,
          gender
      });
    }
};