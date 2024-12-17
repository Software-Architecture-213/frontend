import axiosInstance from "../axiosInstance";

export const identityUserApi = {
    getMyProfile:  async () => {
        return axiosInstance.get("api/identity/users/me");
    },
}