import axios from "axios";
import { BACKEND_URL } from "../../constants/backend";
import { CreateUserRequest } from "../../types/user";

export const identityAuthApi = {
    login: async (email: string, password: string) => {
      return axios.post(`${BACKEND_URL}/api/identity/auth/login`, { email, password });
    },
    register: async (createUserRequest: CreateUserRequest) => {
        return axios.post(`${BACKEND_URL}/api/identity/auth/register`, 
          createUserRequest
      );
    }
};