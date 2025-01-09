import axiosInstance from "../axiosInstance";

export const gameApi = {
    getMany: async () => {
        return axiosInstance.get("api/games/", {})
        // return axios.get("http://localhost:8081")
    },
    update: async (id: string, updateRequest: any ) => {
        return axiosInstance.put(`api/games/${id}`, updateRequest)
    },
}