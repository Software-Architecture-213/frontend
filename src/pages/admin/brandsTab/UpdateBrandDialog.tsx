import { Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Don't forget to import the CSS
import { BrandRow, UpdateBrandRequest } from "../../../types/brand";
import { brandFormValidator, updateBrandValidator } from "../../../utils/formValidator";
import { brandApi } from "../../../api/brandClient/brandApi";

interface UpdateBrandDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  brand: BrandRow,
}

const UpdateBrandDialog: React.FC<UpdateBrandDialogProps> = ({ open, setOpen, brand }) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const formik = useFormik({
    initialValues: {
      displayName: brand.displayName ? brand.displayName : "",
      username: brand.username ? brand.username : "",
      field: brand.field ? brand.field : "",
    },
    validationSchema: updateBrandValidator,
    onSubmit: async (values) => {
      console.log(values);
      setIsLoading(true);
      try {
        const UpdateBrandRequest: UpdateBrandRequest = {
          displayName: values.displayName,
          field: values.field,
        };
        await brandApi.update(brand.id, UpdateBrandRequest);
        toast.info("Brand Updated.")
        // Reload after 3 seconds
        setTimeout(() => {
          window.location.reload(); // Reload the page
        }, 500);
      } catch (error: any) {
        console.error("Error updating profile: ", error);
        toast.error(`${error.response?.data?.message || "An unknown error occurred."}`)
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
            <h3 className="text-lg font-medium text-gray-900">Update Brand</h3>

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
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.displayName && formik.errors.displayName ? "border-red-500" : ""}`}
                />
                {formik.touched.displayName && formik.errors.displayName && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.displayName}</p>
                )}
              </div>

              {/* Username Input */}
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">Username</label>
                <input
                  type="email"
                  value={formik.values.username!}
                  disabled
                  className="w-full p-3 text-black bg-gray-200 border rounded-md focus:outline-none"
                />
              </div>
              {/* Field Input */}
              <div>
                <label className="block text-sm text-left font-medium text-black">Field</label>
                <input
                  type="text"
                  name="field"
                  value={formik.values.field}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.field && formik.errors.field ? "border-red-500" : ""}`}
                />
                {formik.touched.field && formik.errors.field && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.field}</p>
                )}
              </div>

              {/* GPS Latitude Input */}
              {/* <div>
                <label className="block text-sm text-left font-medium text-black">GPS Latitude</label>
                <input
                  type="number"
                  name="latitude"
                  min={-90}
                  max={90}
                  step={0.01}
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.latitude && formik.errors.latitude ? "border-red-500" : ""}`}
                />
                {formik.touched.latitude && formik.errors.latitude && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.latitude}</p>
                )}
              </div> */}

              {/* GPS Longitude Input */}
              {/* <div>
                <label className="block text-sm text-left font-medium text-black">GPS Longitude</label>
                <input
                  type="number"
                  name="longitude"
                  min={-180}
                  max={180}
                  step={0.01}
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.longitude && formik.errors.longitude ? "border-red-500" : ""}`}
                />
                {formik.touched.longitude && formik.errors.longitude && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.longitude}</p>
                )}
              </div> */}
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
                className="ml-2 px-4 py-2 main-bg text-sm text-white bg-blue-600 rounded hover:bg-blue-500"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );

};

export default UpdateBrandDialog;
