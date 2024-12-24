import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandApi } from '../../../api/brandClient/brandApi';

const BrandCreateCampaign = () => {
    const navigate = useNavigate();

    // Form state
    const [campaignName, setCampaignName] = useState('Chào mùa hè mới cùng Phúc Long');
    const [voucherNumber, setVoucherNumber] = useState('1000');
    const [voucherExpirationDate, setVoucherExpirationDate] = useState('');
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('03/17/2023 10:32 AM');
    const [endDate, setEndDate] = useState('03/17/2023 10:32 AM');
    const [image, setImage] = useState<File | null>(null);  // Image file state

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const { name, value } = target;

        if (target instanceof HTMLInputElement && target.type === 'file') {
            setImage(target.files ? target.files[0] : null);  // Set image file
        } else {
            // Handle text and select elements
            const setter = {
                campaignName: setCampaignName,
                voucherNumber: setVoucherNumber,
                voucherExpirationDate: setVoucherExpirationDate,
                category: setCategory,
                startDate: setStartDate,
                endDate: setEndDate,
            }[name];

            if (setter) {
                setter(value);
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Convert startDate and endDate to ISO format
        const formattedStartDate = new Date(startDate).toISOString();  // Converts to 'yyyy-MM-dd'T'HH:mm:ss.SSSZ'
        const formattedEndDate = new Date(endDate).toISOString();      // Converts to 'yyyy-MM-dd'T'HH:mm:ss.SSSZ'
    
        // Prepare the form data as a plain object
        const data = {
            name: campaignName,
            numOfVouchers: voucherNumber,
            voucherExpirationDate: voucherExpirationDate,
            startDate: formattedStartDate,  // Use the correctly formatted date
            endDate: formattedEndDate,      // Use the correctly formatted date
            status: 'INACTIVE',
            category: category,
            imageUrl: image,  // Image URL (string) or null
        };
    
        try {
            // Call the API to create the campaign with normal JSON data
            const response = await brandApi.createCampaignPromotions(data);  // Pass the data object
    
            console.log('Campaign created successfully:', response.data);
            navigate('/brand/campaigns'); // Navigate to campaigns list page after successful creation
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    };

    return (
        <div className="p-3 max-w-6xl mx-auto">
            <div className="text-gray-600 text-lg mb-6">
                <span>Campaigns</span> / <span className="font-bold">Create</span>
            </div>
            <div className="flex">
                <div className="w-1/3 p-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="mb-4"
                    />
                    {image && (
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
                                onClick={() => setImage(null)}  // Remove image
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-2/3 p-4">
                    <form onSubmit={handleSubmit}>
                        {/* Form fields */}
                        <div className="mb-6">
                            <label htmlFor="campaignName" className="block text-md font-semibold text-gray-800 mb-2">Name of Campaign *</label>
                            <input
                                type="text"
                                id="campaignName"
                                name="campaignName"
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4"
                                value={campaignName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="voucherNumber" className="block text-md font-semibold text-gray-800 mb-2">Number of Vouchers *</label>
                            <input
                                type="text"
                                id="voucherNumber"
                                name="voucherNumber"
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4"
                                value={voucherNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="voucherExpirationDate" className="block text-md font-semibold text-gray-800 mb-2">Voucher Expiration Date *</label>
                            <input
                                type="date"
                                id="voucherExpirationDate"
                                name="voucherExpirationDate"
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4"
                                value={voucherExpirationDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="category" className="block text-md font-semibold text-gray-800 mb-2">Category *</label>
                            <select
                                id="category"
                                name="category"
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4"
                                value={category}
                                onChange={handleInputChange}
                            >
                                <option>Price</option>
                                <option>Freeship</option>
                                <option>Take away</option>
                                {/* Add dynamic category options here */}
                            </select>
                        </div>
                        <div className="flex space-x-6 mb-6">
                            <div className="w-1/2">
                                <label htmlFor="startDate" className="block text-md font-semibold text-gray-800 mb-2">Start Date *</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4"
                                    value={startDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="endDate" className="block text-md font-semibold text-gray-800 mb-2">End Date *</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4"
                                    value={endDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full h-12 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            Create Campaign
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BrandCreateCampaign;
