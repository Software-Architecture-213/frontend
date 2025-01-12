import { useFormik } from "formik";
import { useState } from "react";
import { useAuth } from "../../../hooks/AuthContext";
import { PencilIcon } from "@heroicons/react/16/solid";
import ProfilePhotoUpload from "./ProfilePhotoUpload";
import { UpdateUserRequest } from "../../../types/user";
import { identityUserApi } from "../../../api/identityClient/identityUserApi";
import { updateUserProfileValidator } from "../../../utils/formValidator";
import { toast, ToastContainer } from "react-toastify";

const AdminProfilePage = () => {
  const { profile, fetchProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Mod

  const formik = useFormik({
    initialValues: {
      displayName: profile.displayName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split("T")[0] : "",
      gender: profile.gender,
    },
    validationSchema: updateUserProfileValidator,
    onSubmit: async (values) => {
      console.log(values)
      setIsLoading(true);
      try {
        // Simulate API call
        const updateUserRequest: UpdateUserRequest = {
          displayName: values.displayName,
          phoneNumber: values.phoneNumber,
          dateOfBirth: values.dateOfBirth,
          gender: values.gender,
        }
        await identityUserApi.updateMyProfile(updateUserRequest);
        fetchProfile()
        toast.info("Profile updated")
        // fetchProfile(); // Fetch updated profile from context
      } catch (error: any) {
        console.error("Error updating profile: ", error);
        toast.error(`${error.response?.data?.message || "An unknown error occurred."}`)

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
          src={profile.photoUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-gray-300 "
        />
        <button
          onClick={() => setIsDialogOpen(true)}
          className="text-sm flex text-black bg-transparent border-none hover:border-none focus:border-none"
        >
          Edit Photo
          <PencilIcon className="w-5 h-5 ml-1 text-gray-600" /> {/* Pen icon */}
        </button>
        <ProfilePhotoUpload
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
        />
      </div>
      <ToastContainer limit={1} autoClose={2000} />

      {/* Form Section */}
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md space-y-6">
        {/* Display Name Input */}
        <div>
          <label className="block text-sm text-left font-medium text-gray-700">Display Name</label>
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
            <p className="text-red-500 text-left text-sm">{formik.errors.displayName.toString()}</p>
          )}
        </div>

        {/* Email Input - Disabled */}
        <div>
          <label className="block text-sm text-left font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formik.values.email}
            disabled
            className="w-full p-3 text-black bg-gray-200 border rounded-md focus:outline-none"
          />
        </div>

        {/* Phone Number Input */}
        <div>
          <label className="block text-sm text-left font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-3 text-black bg-white border rounded-md focus:outline-none ${formik.touched.phoneNumber && formik.errors.phoneNumber
                ? "border-red-500"
                : "border-gray-300"
              }`}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="text-red-500 text-left text-sm">{formik.errors.phoneNumber.toString()}</p>
          )}
        </div>

        {/* Date of Birth Input */}
        <div>
          <label className="block text-sm text-left font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="text"
            name="dateOfBirth"
            value={formik.values.dateOfBirth.split("T")[0]} // Extract YYYY-MM-DD from the ISO string
            onChange={(e) => formik.setFieldValue('dateOfBirth', e.target.value)}
            onBlur={formik.handleBlur}
            className={`w-full p-3 text-black bg-white border rounded-md focus:outline-none ${formik.touched.dateOfBirth && formik.errors.dateOfBirth
                ? "border-red-500"
                : "border-gray-300"
              }`}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <p className="text-red-500 text-left text-sm">Date of Birth must be "YYYY-MM-DD"</p>
          )}
        </div>

        {/* Gender Input */}
        <div>
          <label className="block text-sm text-left font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-3 text-black bg-white border rounded-md focus:outline-none ${formik.touched.gender && formik.errors.gender
                ? "border-red-500"
                : "border-gray-300"
              }`}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <p className="text-red-500 text-left text-sm">{formik.errors.gender.toString()}</p>
          )}
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

export default AdminProfilePage;
