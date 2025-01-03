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
        return axiosInstance.put("api/identity/users/me", updateRequest)
    },
    uploadPhoto: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file); // Key "file" matches the backend's expected field name
        return axiosInstance.post("api/identity/users/me/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    disableUser: async (email: string, disabled: boolean, message: string,) => {
        return axiosInstance.post(`api/identity/users/${email}/disable`, {email: email, disabled: disabled, message: message})
    }
}