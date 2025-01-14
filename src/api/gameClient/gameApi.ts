import axios from "axios";
import axiosInstance from "../axiosInstance";




export const gameApi = {
    getMany: async () => {
        return axiosInstance.get("api/games/", {})
        // return axios.get("http://localhost:8081/")
    },
    update: async (id: string, updateRequest: any ) => {
        return axiosInstance.put(`api/games/${id}`, updateRequest)
    },

    getUserStatisticAdmin: async (promotionId: string, startDate: string, endDate: string) => {
        const queryParams = {
            type: "interval",
            startDate: startDate,
            endDate: endDate
        };
        return axiosInstance.get(`api/games/statistics/admin/promotions/${promotionId}/users`, { params: queryParams });
    },

    getBudgetStatisticBrand: async (brandId: string) => {
        return axiosInstance.get(`api/games/statistics/brands/${brandId}/budget`);
    }, 
    createGame: async (createRequest: any) => {
        return axios.post("http://localhost:8081/bulk-create", createRequest)
    }
}