import axios from "axios";
import { BACKEND_URL } from "../../constants/backend";
import axiosInstance from "../axiosInstance";

interface GPS {
    lat: number; // Latitude
    lng: number; // Longitude
  }

export const brandApi = {
    login: async (username: string, password: string) => {
      return axios.post(`${BACKEND_URL}/api/brands/auth/login`, { username, password });
    },
    register: async (username: string, password: string, dispalyName: string, imageUrl: string, field: string,
        gps: GPS, status: string) => {
        return axios.post(`${BACKEND_URL}/api/brands/auth/register`, {
            username,
            password,
            dispalyName,
            imageUrl,
            field,
            gps,
            status,
      });
    }, 
    getMyProfile:  async () => {
      return axiosInstance.get("api/brands/auth/me");
    },
    getCampaignPromotions: async () => {
      return axiosInstance.get(`api/brands/promotions/my-promotions`)
    },
    createCampaignPromotions: async (data: { [key: string]: any }) => {
      try {
          // Make the POST request with JSON data (no multipart)
          const response = await axiosInstance.post(`${BACKEND_URL}/api/brands/promotions`, data, {
              headers: {
                  'Content-Type': 'application/json',  // Send as JSON
              },
          });
          return response;
      } catch (error) {
          console.error("Error creating campaign:", error);
          throw error;  // Re-throw the error so it can be caught in the component
      }
    },

    createVoucher: async (data: {
      code: string;
      type: string;
      imageUrl: string;
      valueType: string;
      value: number;
      description: string;
      expiredAt: string;
      status: string;
      promotionId: string | undefined;
      maxCounts: number;
      createCounts: number;
    }) => {
      return axiosInstance.post(`${BACKEND_URL}/api/brands/vouchers`, data);
    },

    
};