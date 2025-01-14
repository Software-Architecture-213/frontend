import { useFormik } from "formik";
import { useState } from "react";
import { useAuth } from "../../../hooks/AuthContext";
import { PencilIcon } from "@heroicons/react/16/solid";
import ProfilePhotoUpload from "./ProfilePhotoUpload";
import { brandApi } from "../../../api/brandClient/brandApi";
import { updateBrandProfileValidator } from "../../../utils/formValidator";
import DEFAULT_AVATAR from "../../../assets/images/default_avatar.png";

const BrandProfilePage = () => {
    const { profile, fetchProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Modal state
    const formik = useFormik({
        initialValues: {
            displayName: profile.displayName || "",
            username: profile.username || "",
            field: profile.field || "",
            imageUrl: profile.imageUrl || "",
            mainBranch: profile.gps || { latitude: 0, longitude: 0 },
            status: profile.status || "ACTIVE",
        },
        validationSchema: updateBrandProfileValidator,
        onSubmit: async (values) => {
            console.log(formik.errors)
            console.log(values);
            setIsLoading(true);
            try {
                const updateUserRequest = {
                    displayName: values.displayName,
                    field: values.field,
                    gps: values.mainBranch,
                    status: values.status,
                };
                await brandApi.updateMyProfile(updateUserRequest);
                fetchProfile(); // Refresh profile data
            } catch (error) {
                console.error("Error updating profile: ", error);
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="flex flex-col justify-content-center items-center p-6 space-y-6 overflow-hidden">
            {/* Profile Section */}
            <div className="text-center space-y-4 mb-2">
                <img
                    src={profile.imageUrl ?? DEFAULT_AVATAR}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-2 border-gray-300"
                />
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="text-sm flex text-black bg-transparent border-none hover:border-none focus:border-none"
                >
                    Edit Photo
                    <PencilIcon className="w-5 h-5 ml-1 text-gray-600" />
                </button>
                <ProfilePhotoUpload open={isDialogOpen} setOpen={setIsDialogOpen} />
            </div>

            {/* Form Section */}
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md space-y-6">
                {/* Display Name Input */}
                <div>
                    <label className="block text-sm text-left font-medium text-gray-700">
                        Display Name
                    </label>
                    <input
                        type="text"
                        name="displayName"
                        value={formik.values.displayName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-3 text-black bg-white border rounded-md focus:outline-none ${formik.touched.displayName && formik.errors.displayName
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                    />
                    {formik.touched.displayName && formik.errors.displayName && (
                        <p className="text-red-500 text-left text-sm">
                            {formik.errors.displayName.toString()}
                        </p>
                    )}
                </div>

                {/* Username Input - Disabled */}
                <div>
                    <label className="block text-sm text-left font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        value={formik.values.username}
                        disabled
                        className="w-full p-3 text-black bg-gray-200 border rounded-md focus:outline-none"
                    />
                </div>

                {/* Field Input */}
                <div>
                    <label className="block text-sm text-left font-medium text-gray-700">
                        Field
                    </label>
                    <input
                        type="text"
                        name="field"
                        value={formik.values.field}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-3 text-black bg-white border rounded-md focus:outline-none ${formik.touched.field && formik.errors.field
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                    />
                    {formik.touched.field && formik.errors.field && (
                        <p className="text-red-500 text-left text-sm">
                            {formik.errors.field.toString()}
                        </p>
                    )}
                </div>

                {/* GPS Coordinates */}
                <div className="flex space-x-4">
                    <div>
                        <label className="block text-sm text-left font-medium text-gray-700">
                            Latitude
                        </label>
                        <input
                            type="number"
                            name="mainBranch.latitude"
                            value={formik.values.mainBranch.latitude}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 text-black bg-white border rounded-md focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-left font-medium text-gray-700">
                            Longitude
                        </label>
                        <input
                            type="number"
                            name="mainBranch.longitude"
                            value={formik.values.mainBranch.longitude}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 text-black bg-white border rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                {/* Status Input */}
                <div>
                    <label className="block text-sm text-left font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-3 text-black bg-white border rounded-md focus:outline-none"
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-3 bg-f75f07 text-white main-bg rounded-md border-2 hover:bg-f75f07/90 focus:outline-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default BrandProfilePage;
