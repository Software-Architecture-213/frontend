import axios from "axios";
import { BACKEND_URL } from "../../constants/backend";
import axiosInstance, { logout } from "../axiosInstance";
import { BrandsRequest, GPS, GPS2, UpdateBrandRequest } from "../../types/brand";
import Cookies from "universal-cookie";


export const brandApi = {
  login: async (username: string, password: string) => {
    return axios.post(`${BACKEND_URL}/api/brands/auth/login`, { username, password });
  },
  register: async (username: string, password: string, displayName: string, field: string,
    gps: GPS2) => {
    return axios.post(`${BACKEND_URL}/api/brands/collection`, {
      username,
      password,
      displayName,
      field,
      gps,
    });
  },
  logout: async () => {
    const cookies = new Cookies({}, { path: '/' })
    cookies.remove("accessToken")
    cookies.remove("refreshToken")
    logout()
  },
  getMyProfile: async () => {
    return axiosInstance.get("api/brands/auth/me");
  },
  updateMyProfile: async (data: { [key: string]: any }) => {
    return axiosInstance.put(`api/brands/collection`, data);
  },
  update: async (id: string, updateBrandRequest: UpdateBrandRequest) => {
    return axiosInstance.patch(`api/brands/collection/${id}`, updateBrandRequest);
  },
  getAllCampaignPromotions: async () => {
    return axiosInstance.get(`api/brands/promotions`)
  },
  getCampaignPromotions: async () => {
    return axiosInstance.get(`api/brands/promotions/me/get`)
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
  uploadImage: async (file: File, id: String, type: String) => {
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
  getBrands: async (request: BrandsRequest) => {
    return axiosInstance.get("/api/brands/collection", {
      params: request
    }
    );
  },

  changeBrandStatus: async (email: string, status: "ACTIVE" | "INACTIVE", message: string | null) => {
    return axiosInstance.post(`/api/brands/collection/${email}/status`, { status: status, message: message })
  },

  createBranch: async (data: {
    name: string;
    address: string;
    gps: GPS;
  }) => {
    return axiosInstance.post("/api/brands/branches", data);
  },
  getPayment: async () => {
    return axiosInstance.get("/api/brands/checkout");
  },
  updateVoucherUser: async (data: {
    voucherId: string,
    userId: string,
    status: string,
  }) => {
    return axiosInstance.put("/api/brands/vouchers/voucher/me", data);
  },

  getGameStatisticAdmin: async () => {
    return axiosInstance.get("/api/brands/statistic/admin/games");
  },

  getBrandStatisticAdmin: async (startDate: string, endDate: string) => {
    const queryParams = {
      startDate: startDate,
      endDate: endDate
    };
    return axiosInstance.get("/api/brands/statistic/admin/brands", { params: queryParams });
  },

  getVoucherStatisticBrand: async (brandId: string, startDate: string, endDate: string) => {
    const queryParams = {
      startDate: startDate,
      endDate: endDate
    };
    return axiosInstance.get(`/api/brands/statistic/brands/${brandId}/vouchers`, { params: queryParams });
  },
  getAllPayments: async () => {
    return axiosInstance.get(`/api/brands/checkout/all`);
  }, 
  createConversionRule: async(data: any) => {
    return axiosInstance.post('/api/brands/promotions/promotion/conversions-rule', data)
  }
};