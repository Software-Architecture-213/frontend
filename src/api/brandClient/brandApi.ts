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
      promotionId: string | undefined;
      voucherCode: string;
      value: number;
      expirationDate: string;
      status: string;
    }) => {
      return axiosInstance.post(`${BACKEND_URL}/api/brands/vouchers`, data);
    },

    
};