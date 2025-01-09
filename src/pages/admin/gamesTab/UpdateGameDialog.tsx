import { Dialog } from "@headlessui/react";
import { updateGameValidator } from "../../../utils/formValidator";
import { useFormik } from "formik";
import { useState } from "react";
import { GameRow } from "../../../types/game";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Don't forget to import the CSS
import { gameApi } from "../../../api/gameClient/gameApi";

interface UpdateGameDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  game: GameRow,
}

const UpdateGameDialog: React.FC<UpdateGameDialogProps> = ({ open, setOpen, game }) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const formik = useFormik({
    initialValues: {
      name: game.name ? game.name : "",
      description: game.description ? game.description : "",
      type: game.type ? game.type : "",
      difficulty: game.difficulty ? game.difficulty : "",
    },
    validationSchema: updateGameValidator,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const updateGameRequest: any = {
          name: values.name,
          description: values.description,
          type: values.type,
          difficulty: values.difficulty,
        };
        await gameApi.update(game._id, updateGameRequest);
        toast.info("Game Updated.");
        // Reload after 3 seconds
        setTimeout(() => {
          window.location.reload(); // Reload the page
        }, 500);
      } catch (error: any) {
        console.error("Error updating profile: ", error);
        toast.error(`${error.response?.data?.message || "An unknown error occurred, please try again"}`);
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
            <h3 className="text-lg font-medium text-gray-900">Update Game</h3>

            <div className="p-2 overflow-y-auto max-h-96 custom-scrollbar space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm text-left font-medium text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                    }`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.name}</p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm text-left font-medium text-black">Description</label>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`custom-scrollbar w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.description && formik.errors.description ? "border-red-500" : ""
                    }`}
                  rows={3} // You can adjust rows to set the initial height
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.description}</p>
                )}
              </div>

              {/* Type Input */}
              <div>
                <label className="block text-sm text-left font-medium text-black">Type</label>
                <input
                  type="text"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.type && formik.errors.type
                    ? "border-red-500"
                    : ""
                    }`}
                />
                {formik.touched.type && formik.errors.type && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.type}</p>
                )}
              </div>

              {/* Difficulty Input */}
              <div>
                <label className="block text-sm text-left font-medium text-black">Difficulty</label>
                <input
                  type="text"
                  name="difficulty"
                  value={formik.values.difficulty}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none ${formik.touched.difficulty && formik.errors.difficulty
                    ? "border-red-500"
                    : ""
                    }`}
                />
                {formik.touched.difficulty && formik.errors.difficulty && (
                  <p className="text-red-500 text-left text-sm">{formik.errors.difficulty}</p>
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
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateGameDialog;
