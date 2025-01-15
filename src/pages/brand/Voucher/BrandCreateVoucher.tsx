import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { brandApi } from '../../../api/brandClient/brandApi';
import imageCompression from 'browser-image-compression';
import { gameApi } from '../../../api/gameClient/gameApi';

const BrandCreateVoucher = () => {
  const { promotionId } = useParams<{ promotionId: string }>();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [type, setType] = useState('ONLINE');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [valueType, setValueType] = useState('PERCENTAGE');
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [expiredAt, setExpiredAt] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [maxCounts, setMaxCounts] = useState<number>(0);
  const [createCounts, setCreateCounts] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      console.log(promotionId);
      const response = await gameApi.getItemsByPromotionId(promotionId!);
      if (response.data){
        setItems(response.data.data);
      }
    };

    fetchItems();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === 'file') {
      handleFileChange(e);
    } else {
      const setters: { [key: string]: React.Dispatch<React.SetStateAction<any>> } = {
        code: setCode,
        type: setType,
        valueType: setValueType,
        value: setValue,
        description: setDescription,
        expiredAt: setExpiredAt,
        status: setStatus,
        maxCounts: setMaxCounts,
        createCounts: setCreateCounts,
      };
      const setter = setters[name];
      if (setter) {
        setter(value);
      }
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const selectedFile = (event.target as HTMLInputElement).files?.[0];
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

        setImage(compressedFile);
        setImagePreview(URL.createObjectURL(compressedFile));
        console.log(
          `Original file size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
        );
        console.log(
          `Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
        );
      } catch (error) {
        console.error('Error during image compression:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      code,
      type,
      imageUrl: '',
      valueType,
      value,
      description,
      expiredAt,
      status,
      promotionId,
      maxCounts,
      createCounts,
    };

    try {
      const response = await brandApi.createVoucher(data);
      const voucherId = response.data.id;
      console.log(items)
      if (items != null){
        const conversionRuleData = {
          voucherId,
          promotionId,
          items: items.map((item: any) => ({
            itemId: item.id,
            quantity: item.maxQuantity || 1,
          })),
        };
  
        await brandApi.createConversionRule(conversionRuleData);
      }

      if (image) {
        const formData = new FormData();
        formData.append('file', image);

        try {
          await uploadImage(response.data.id);
          setMessage("Voucher and image uploaded successfully.");
        } catch (uploadError) {
          setMessage("Voucher created, but failed to upload image.");
        }
      } else {
        setMessage("Voucher created successfully without an image.");
      }

      navigate('/brand/voucher'); // Redirect to voucher dashboard after successful creation
    } catch (error) {
      console.error('Error creating voucher:', error);
      setMessage("Failed to create voucher. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadImage = async (voucherId: string) => {
    const formData = new FormData();
    formData.append('image', image!);  // Assuming image is never null when uploading

    setIsUploading(true);

    try {
      const response = await brandApi.uploadImage(image!, voucherId, 'vouchers');
      console.log('Image uploaded successfully:', response.data);
      // Handle the response after image upload
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false); // Stop loading
    }
  };



  return (
    <div className="p-3 max-w-6xl mx-auto">
      <div className="text-gray-600 text-lg mb-6">
        <span>Vouchers</span> / <span className="font-bold">Create</span>
      </div>
      <div className="flex text-black">
        <div className="w-1/3 p-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="mb-4"
          />
          {imagePreview && (
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 text-white flex items-center justify-center rounded-md mr-2">IMG</div>
                <div className="text-sm">
                  <p>{image?.name}</p>
                  <p className="text-xs text-gray-500">{(image!.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                className="text-red-500"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          )}
        </div>
        <div className="w-2/3 p-4">
          <form onSubmit={handleSubmit}>
            {/* Other form fields remain the same */}
            <div className="mb-6">
              <label htmlFor="code" className="block text-md font-semibold text-gray-800 mb-2">Code *</label>
              <input
                type="text"
                id="code"
                name="code"
                className="mt-1 block w-full h-12 text-lg border border-gray-300 bg-white rounded-lg shadow-sm px-4"
                value={code}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="type" className="block text-md font-semibold text-gray-800 mb-2">Type *</label>
              <select
                id="type"
                name="type"
                className="mt-1 block w-full h-12 text-lg border border-gray-300 bg-white rounded-lg shadow-sm px-4"
                value={type}
                onChange={handleInputChange}
              >
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="valueType" className="block text-md font-semibold text-gray-800 mb-2">Value Type *</label>
              <select
                id="valueType"
                name="valueType"
                className="mt-1 block w-full h-12 text-lg border border-gray-300 bg-white rounded-lg shadow-sm px-4"
                value={valueType}
                onChange={handleInputChange}
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed</option>                
                <option value="FREE">Free</option>
                <option value="ITEM">Item</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="value" className="block text-md font-semibold text-gray-800 mb-2">Value *</label>
              <input
                type="number"
                id="value"
                name="value"
                className="mt-1 block w-full h-12 text-lg border border-gray-300 bg-white rounded-lg shadow-sm px-4"
                value={value}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-md font-semibold text-gray-800 mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                className="mt-1 block w-full text-lg border border-gray-300 bg-white rounded-lg shadow-sm px-4"
                value={description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="flex space-x-6 mb-6">
              <div className="w-1/2">
                <label htmlFor="expiredAt" className="block text-md font-semibold text-gray-800 mb-2">Expiration Date *</label>
                <input
                  type="date"
                  id="expiredAt"
                  name="expiredAt"
                  className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4 text-gray-800"
                  value={expiredAt}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="status" className="block text-md font-semibold text-gray-800 mb-2">Status *</label>
                <select
                  id="status"
                  name="status"
                  className="mt-1 block w-full h-12 text-lg border border-gray-300 bg-white rounded-lg shadow-sm px-4"
                  value={status}
                  onChange={handleInputChange}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="maxCounts" className="block text-md font-semibold text-gray-800 mb-2">Max Counts *</label>
              <input
                type="number"
                id="maxCounts"
                name="maxCounts"
                className="mt-1 block w-full h-12 text-lg border border-gray-300 bg-white rounded-lg shadow-sm px-4"
                value={maxCounts}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="createCounts" className="block text-md font-semibold text-gray-800 mb-2">Create Counts *</label>
              <input
                type="number"
                id="createCounts"
                name="createCounts"
                className="mt-1 block w-full h-12 text-lg border border-gray-300 bg-white rounded-lg shadow-sm px-4"
                value={createCounts}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6 flex p-3">
              <p className="justify-start text-md font-semibold text-gray-800">Message: {message}</p>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Create Voucher'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrandCreateVoucher;
