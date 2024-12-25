import { UpdateUserRequest, UsersRequest } from "../../types/user";
import axiosInstance from "../axiosInstance";

export const identityUserApi = {
    getMany: async (usersRequest: UsersRequest) => {
        return axiosInstance.get("api/identity/users", {
            params: usersRequest
        })
    },
    getMyProfile:  async () => {
        return axiosInstance.get("api/identity/users/me");
    },
    updateMyProfile: async (updateRequest?: UpdateUserRequest) => {
        return axiosInstance.put("api/identity/users", updateRequest)
    },
    uploadPhoto: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file); // Key "file" matches the backend's expected field name
        return axiosInstance.post("api/identity/users/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
}