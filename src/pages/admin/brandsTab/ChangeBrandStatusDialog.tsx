import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Don't forget to import the CSS
import { BrandRow } from "../../../types/brand";
import { brandApi } from "../../../api/brandClient/brandApi";

interface ChangeBrandStatusDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onChange: (brand: BrandRow) => void;
  brand: BrandRow;
}

const ChangeBrandStatusDialog: React.FC<ChangeBrandStatusDialogProps> = ({ open, setOpen, onChange, brand }) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Message state

  const handleClose = () => {
    setOpen(false); // Close dialog
  };

  // const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setMessage(e.target.value); // Update message with textarea input
  // }
  const handleChange =  async (e: any) => {
    console.log(message)
    try {
      setIsLoading(true)
      const status =  brand.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"; 
      const response = await brandApi.changeBrandStatus(brand.username!, status, message)
      const data = await response.data
      console.log(data)
      const updatedBrand = { ...brand, status: status };
      setOpen(false)
      onChange(updatedBrand)
    } catch (error: any) {
      console.error("Error enable brand: ", error);
      toast.error(`${error.response?.data?.message || "An unknown error occurred."}`)
    } finally {
      setIsLoading(false);
    }
  }

  const buttonText = brand.status === "ACTIVE" ?  `Deactivate` : `Activate`
  const loadingButtonText = brand.status === "ACTIVE" ?  `Deactivating...` : `Activating...`


  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <ToastContainer limit={1} autoClose={2000} />
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="p-2 space-y-4">
            <h3 className="text-lg px-2 font-medium text-gray-900">{buttonText} Brand</h3>

            <div className="p-2 overflow-y-auto max-h-96 custom-scrollbar space-y-4">
              {/* Message Textarea */}
              <div>
                <label className="block text-sm text-left font-medium text-black">Message</label>
                <textarea
                  name="message"
                  value={message} // Controlled textarea
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} // Handle change
                  rows={4} // Number of rows for multiline input
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none`}
                />
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
                type="button"
                className="ml-2 px-4 main-bg py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-500"
                disabled={isLoading}
                onClick={handleChange}
              >
                {isLoading ? loadingButtonText  :  buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ChangeBrandStatusDialog;
