import axios from "axios";
import { BACKEND_URL } from "../../constants/backend";
import { CreateUserRequest } from "../../types/user";
import Cookies from "universal-cookie";
import { logout } from "../axiosInstance";

export const identityAuthApi = {
  login: async (email: string, password: string) => {
    return axios.post(`${BACKEND_URL}/api/identity/auth/login`, { email, password });
  },
  register: async (createUserRequest: CreateUserRequest) => {
    return axios.post(`${BACKEND_URL}/api/identity/auth/register`,
      createUserRequest
    );
  },
  logout: async () => {
    const cookies = new Cookies({}, { path: '/' })
    cookies.remove("accessToken")
    cookies.remove("refreshToken")
    logout()

  }
};