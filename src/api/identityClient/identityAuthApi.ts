import axios from "axios";
import { BACKEND_URL } from "../../constants/backend";

export const identityAuthApi = {
    login: async (email: string, password: string) => {
      return axios.post(`${BACKEND_URL}/api/identity/auth/login`, { email, password });
    },
    register: async ( displayName: string, email: string,  password: string, 
        role: string, phoneNumber: string,  dateOfBirth: string, gender: string) => {
        return axios.post(`${BACKEND_URL}/api/identity/auth/register`, {
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