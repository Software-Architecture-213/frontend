import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { brandApi } from '../../../api/brandClient/brandApi';
import imageCompression from 'browser-image-compression';

const BrandUpdateVoucher = () => {
    const { voucherId } = useParams<{ voucherId: string }>();
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [type, setType] = useState('ONLINE');
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [valueType, setValueType] = useState('PERCENTAGE');
    const [value, setValue] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [expiredAt, setExpiredAt] = useState('');
    const [status, setStatus] = useState('ACTIVE');
    const [maxCounts, setMaxCounts] = useState<number>(0);
    const [createCounts, setCreateCounts] = useState<number>(0);
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const response = await brandApi.getVoucherDetail(voucherId!);
                const voucher = response.data;
                setCode(voucher.code);
                setType(voucher.type);
                setValueType(voucher.valueType);
                setValue(voucher.value);
                setDescription(voucher.description);
                
                const formattedExpiredAt = new Date(voucher.expiredAt).toISOString().split('T')[0];
                
                setImageUrl(voucher.imageUrl);
                setExpiredAt(formattedExpiredAt);
                setStatus(voucher.status);
                setMaxCounts(voucher.maxCounts);
                setCreateCounts(voucher.createCounts);
                setImagePreview(voucher.imageUrl);
            } catch (error) {
                console.error('Error fetching voucher:', error);
                setMessage('Failed to fetch voucher details.');
            }
        };
        if (voucherId) {
            fetchVoucher();
        }
    }, [voucherId]);

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

    // Safely check for image before using its properties (in your JSX or code elsewhere)
    if (image && image.size) {
        console.log(`Image size: ${(image.size / 1024).toFixed(2)} KB`);
    }


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
            promotionId: '', // Assuming promotionId is required but not being updated
            maxCounts,
            createCounts,
        };

        try {
            const response = await brandApi.updateVoucher(voucherId!, data);

            if (image) {
                const formData = new FormData();
                formData.append('file', image);

                try {
                    await uploadImage(response.data.id);
                    setMessage("Voucher and image updated successfully.");
                } catch (uploadError) {
                    setMessage("Voucher updated, but failed to upload image.");
                }
            } else {
                setMessage("Voucher updated successfully without an image.");
            }

            navigate('/brand/voucher'); // Redirect to voucher dashboard after successful update
        } catch (error) {
            console.error('Error updating voucher:', error);
            setMessage("Failed to update voucher. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const uploadImage = async (voucherId: string) => {
        const formData = new FormData();
        formData.append('image', image!); // Assuming image is never null when uploading
        
        setIsUploading(true);

        try {
            const response = await brandApi.uploadImage(image!, voucherId, 'vouchers');
            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setIsUploading(false); // Stop loading
        }
    };

    return (
        <div className="p-3 max-w-6xl mx-auto">
            <div className="text-gray-600 text-lg mb-6">
                <span>Vouchers</span> / <span className="font-bold">Update</span>
            </div>
            <div className="flex">
                <div className="w-1/3 p-4">
                    <div className="mt-4 mb-4">
                        <img src={imageUrl} alt="Campaign Image" className="max-w-full h-auto rounded-lg shadow-lg" />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="mb-4"
                    />
                    {imagePreview && image && image.size ? (
                        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-purple-500 text-white flex items-center justify-center rounded-md mr-2">IMG</div>
                                <div className="text-sm">
                                    <p>{image.name}</p>
                                    <p className="text-xs text-gray-500">{(image.size / 1024).toFixed(2)} KB</p>
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
                    ) : null}

                </div>
                <div className="w-2/3 p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="code" className="block text-md font-semibold text-gray-800 mb-2">Code *</label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
                                value={code}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="type" className="block text-md font-semibold text-gray-800 mb-2">Type *</label>
                            <select
                                id="type"
                                name="type"
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
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
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
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
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
                                value={value}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-md font-semibold text-gray-800 mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="mt-1 block w-full text-lg border border-gray-300 rounded-lg shadow-sm px-4"
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
                                    className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
                                    value={expiredAt}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="status" className="block text-md font-semibold text-gray-800 mb-2">Status *</label>
                                <select
                                    id="status"
                                    name="status"
                                    className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
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
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
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
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
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
                            {isUploading ? 'Uploading...' : 'Update Voucher'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BrandUpdateVoucher;
