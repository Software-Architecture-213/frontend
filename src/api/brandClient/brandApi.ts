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
    updateMyProfile: async (data: { [key: string]: any }) => {
      return axiosInstance.put(`api/brands/collection`, data);
    },
    getCampaignPromotions: async () => {
      return axiosInstance.get(`api/brands/promotions/my-promotions`)
    },
    updateCampaignPromotions: async (promotionId: string, data: { [key: string]: any }) => {
      return axiosInstance.put(`api/brands/promotions/${promotionId}`, data)
    },
    getCampaignPromotionDetail: async (promotionId: string) => {
      return axiosInstance.get(`api/brands/promotions/${promotionId}`)
    },
    getVoucherDetail: async (voucherId: string) => {
      return axiosInstance.get(`api/brands/vouchers/${voucherId}`)
    },
    updateVoucher: async (voucherId: string, data: { [key: string]: any }) => {
      return axiosInstance.put(`api/brands/vouchers/${voucherId}`, data)
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

    // New method for uploading image
    uploadImage: async (file: File ,id: String, type: String) => {
      let endpoint = '';
      const formData = new FormData();
      formData.append("file", file);
      if (type === 'brands') {
        endpoint = `${BACKEND_URL}/api/brands/collection/upload-image`;
      } else if (type === 'vouchers') {
        endpoint = `${BACKEND_URL}/api/brands/vouchers/upload-image/${id}`;
      } else if (type === 'promotions') {
        endpoint = `${BACKEND_URL}/api/brands/promotions/upload-image/${id}`;
      } else {
        throw new Error('Invalid image type. Supported types are: brands, vouchers, promotions.');
      }
  
      try {
        const response = await axiosInstance.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        console.error(`Error uploading ${type} image:`, error);
        throw error;
      }
    },
    getBranches: async () => {
      return axiosInstance.get("/api/brands/branches");
    },
  
    createBranch: async (data: {
      name: string;
      address: string;
      gps: GPS;
    }) => {
      return axiosInstance.post("/api/brands/branches", data);
    },
};