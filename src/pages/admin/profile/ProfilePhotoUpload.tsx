import { useState, ChangeEvent } from "react";
import { Dialog } from "@headlessui/react";
import { useAuth } from "../../../hooks/AuthContext";
import { identityUserApi } from "../../../api/identityClient/identityUserApi";
import imageCompression from "browser-image-compression";
import { setLocale } from "yup";

interface ProfilePhotoUploadProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({ open, setOpen }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null); // For image previewImage
  const [file, setFile] = useState<File | null>(null); // For selected file
  const [isLoading, setIsLoading] = useState(false); 
  const { profile, fetchProfile } = useAuth();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      try {
        // Compression options
        const options = {
          maxSizeMB: 1, // Maximum size in MB
          maxWidthOrHeight: 1024, // Resize to max width or height
          useWebWorker: true, // Use web worker for better performance
        };

        // Compress the file
        const compressedFile = await imageCompression(selectedFile, options);

        setFile(compressedFile);
        setPreviewImage(URL.createObjectURL(compressedFile));
        console.log(
          `Original file size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
        );
        console.log(
          `Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
        );
      } catch (error) {
        console.error("Error during image compression:", error);
      }
    }
  };

  const handleUpload = async () => {
    if (file) {
      // Handle file upload logic here (e.g., send the file to the server)
      console.log("Uploading file: ", file);
      setIsLoading(true)
      try {
        const response = await identityUserApi.uploadPhoto(file)
        console.log(response)
        fetchProfile()
        handleClose(); // Close dialog after upload
      } catch (e) {
        console.log("Error when upload photo " + e)
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  const handleClose = () => {
    setFile(null); // Reset file
    setPreviewImage(null); // Reset previewImage
    setOpen(false); // Close dialog
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Update Profile Photo</h3>
            <div className="flex justify-center">
              <img
                src={previewImage || profile.photoUrl}
                alt="Profile PreviewImage"
                className="w-32 h-32 rounded-full border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Choose a new photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-500"
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
            <button
              type="button"
              disabled={!file || isLoading}
              className="ml-2 px-4 main-bg py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-500"
              onClick={handleUpload}
            >
              {isLoading ? "Uploading..." : "Upload"} 
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfilePhotoUpload;
