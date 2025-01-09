import { Dialog } from "@headlessui/react";
import { updateUserProfileValidator } from "../../../utils/formValidator";
import { useFormik } from "formik";
import { useState } from "react";
import { UpdateUserRequest, UserRow } from "../../../types/user";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Don't forget to import the CSS
import { identityUserApi } from "../../../api/identityClient/identityUserApi";

interface UpdateUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: UserRow,
}

const UpdateUserDialog: React.FC<UpdateUserDialogProps> = ({ open, setOpen, user }) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const formik = useFormik({
    initialValues: {
      displayName: user.displayName ? user.displayName : "",
      email: user.email ? user.email : "",
      phoneNumber: user.phoneNumber ? user.phoneNumber : "",
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth : "",
      gender: user.gender ? user.gender : "",
    },
    validationSchema: updateUserProfileValidator,
    onSubmit: async (values) => {
      console.log(values);
      setIsLoading(true);
      try {
        const updateUserRequest: UpdateUserRequest = {
          displayName: values.displayName,
          phoneNumber: values.phoneNumber,
          dateOfBirth: values.dateOfBirth,
          gender: values.gender === "MALE" ? "MALE" : "FEMALE",
        };
        await identityUserApi.updateUserProfile(user.userId, updateUserRequest);
        toast.info("User Updated.")
        // Reload after 3 seconds
        setTimeout(() => {
          window.location.reload(); // Reload the page
        }, 500);
      } catch (error: any) {
        console.error("Error updating profile: ", error);
        toast.error(`${error.response?.data?.message || "An unknown error occurred, please try again"}`)
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleClose = () => {
    setOpen(false); // Close dialog
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <ToastContainer limit={1} autoClose={2000} />
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          <form onSubmit={formik.handleSubmit} className="p-2 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Update User</h3>

            <div className="p-2 overflow-y-auto max-h-96 custom-scrollbar space-y-4">
              {/* Display Name Input */}
              <div>
                <label className="block text-sm text-left font-medium text-black">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formik.values.displayName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.displayName && formik.errors.displayName
                    ? "border-red-500"
                    : ""
                    }`}
                />
                {formik.touched.displayName && formik.errors.displayName && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.displayName}</p>
                )}
              </div>

              {/* Email Input - Disabled */}
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formik.values.email!}
                  disabled
                  className="w-full p-3 text-black bg-gray-200 border rounded-md focus:outline-none"
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label className="block text-sm text-left font-medium text-black">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "border-red-500"
                    : ""
                    }`}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.phoneNumber}</p>
                )}
              </div>

              {/* Date of Birth Input */}
              <div>
                <label className="block text-sm text-left font-medium text-black">Date of Birth (YYYY-MM-DD)</label>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "border-red-500"
                    : ""
                    }`}
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <p className="text-red-500 text-left text-sm">Date of Birth must be a "YYYY-MM-DD"</p>
                )}
              </div>

              {/* Gender Input */}
              <div>
                <label className="block text-sm text-left font-medium text-black">Gender</label>
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.gender && formik.errors.gender
                    ? "border-red-500"
                    : ""
                    }`}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.gender}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end p-4 border-t">
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-700 bg-white border rounded hover:bg-gray-50"
                onClick={handleClose}
              >
                Cancel
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                className="ml-2 px-4 main-bg py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-500"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateUserDialog;
