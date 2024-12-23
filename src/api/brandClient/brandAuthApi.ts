import axios from "axios";
import { BACKEND_URL } from "../../constants/backend";
import axiosInstance from "../axiosInstance";

interface GPS {
    lat: number; // Latitude
    lng: number; // Longitude
  }

export const brandApi = {
    login: async (email: string, password: string) => {
      return axios.post(`${BACKEND_URL}/api/brands/auth/login`, { email, password });
    },
    register: async (email: string, password: string, name: string, field: string,
        address: string, gps: GPS, status: string) => {
        return axios.post(`${BACKEND_URL}/api/brands/auth/register`, {
            email,
            password,
            name,
            field,
            address,
            gps,
            status,
      });
    }, 
    getMyProfile:  async () => {
      return axiosInstance.get("api/brands/auth/me");
    },
    getCampaignPromotions: async () => {
      return axiosInstance.get(`api/brands/promotions/my-promotions`)
    }
};