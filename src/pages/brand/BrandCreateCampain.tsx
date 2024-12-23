import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Games = {
    tile2048: boolean;
    flip: boolean;
    shake: boolean;
    quiz: boolean;
};

const BrandCreateCampaign = () => {
    const navigate = useNavigate();
    
    // Form state
    const [campaignName, setCampaignName] = useState('Chào mùa hè mới cùng Phúc Long');
    const [voucherNumber, setVoucherNumber] = useState('1000');
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('03/17/2023 10:32 AM');
    const [endDate, setEndDate] = useState('03/17/2023 10:32 AM');
    const [randomType, setRandomType] = useState('');
    const [games, setGames] = useState<Games>({
        tile2048: false,
        flip: false,
        shake: false,
        quiz: false,
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const { name, value } = target;
    
        // Narrow down type for checkbox and radio inputs
        if (target instanceof HTMLInputElement && (target.type === 'radio' || target.type === 'checkbox')) {
            const { checked } = target; // Extract checked property
    
            if (name === 'randomType') {
                setRandomType(value);
            } else if (name in games) {
                setGames((prevState) => ({
                    ...prevState,
                    [name]: checked,
                }));
            }
        } else if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
            // Handle text and select elements
            const setter = {
                campaignName: setCampaignName,
                voucherNumber: setVoucherNumber,
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
        
        // Data to send to the backend
        const formData = {
            campaignName,
            voucherNumber,
            category,
            startDate,
            endDate,
            randomType,
            games,
        };

        try {
            const response = await axios.post('/api/campaigns', formData);
            console.log('Campaign created successfully:', response.data);
            navigate('/brand/campaigns'); // Navigate to campaigns list page
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
                    <img 
                        src="https://placehold.co/300x300" 
                        alt="Coupon design with 20% OFF text on a gift voucher" 
                        className="rounded-lg shadow-md mb-4" 
                    />
                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-500 text-white flex items-center justify-center rounded-md mr-2">PNG</div>
                            <div className="text-sm">
                                <p>download1.png</p>
                                <p className="text-xs text-gray-500">5 KB</p>
                            </div>
                        </div>
                        <button className="text-red-500">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
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
                            <label htmlFor="voucherNumber" className="block text-md font-semibold text-gray-800 mb-2">Number of voucher *</label>
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
                            <label htmlFor="category" className="block text-md font-semibold text-gray-800 mb-2">Category *</label>
                            <select 
                                id="category" 
                                name="category"
                                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4"
                                value={category}
                                onChange={handleInputChange}
                            >
                                <option>Select category</option>
                                {/* Add dynamic category options here */}
                            </select>
                        </div>
                        <div className="flex space-x-6 mb-6">
                            <div className="w-1/2">
                                <label htmlFor="startDate" className="block text-md font-semibold text-gray-800 mb-2">Start Date *</label>
                                <input 
                                    type="text" 
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
                                    type="text" 
                                    id="endDate" 
                                    name="endDate"
                                    className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4"
                                    value={endDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-md font-semibold text-gray-800 mb-2">Choose random type *</p>
                            <div className="flex items-center space-x-6">
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="randomType" 
                                        value="Chainlink" 
                                        className="form-radio text-indigo-600 h-6 w-6" 
                                        checked={randomType === 'Chainlink'}
                                        onChange={handleInputChange}
                                    />
                                    <span className="ml-2 text-lg">Chainlink</span>
                                </label>
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="randomType" 
                                        value="Uniswap" 
                                        className="form-radio text-indigo-600 h-6 w-6" 
                                        checked={randomType === 'Uniswap'}
                                        onChange={handleInputChange}
                                    />
                                    <span className="ml-2 text-lg">Uniswap</span>
                                </label>
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="randomType" 
                                        value="Uniswap(Nonce Number)" 
                                        className="form-radio text-indigo-600 h-6 w-6" 
                                        checked={randomType === 'Uniswap(Nonce Number)'}
                                        onChange={handleInputChange}
                                    />
                                    <span className="ml-2 text-lg">Uniswap(Nonce Number)</span>
                                </label>
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-md font-semibold text-gray-800 mb-2">Choose games *</p>
                            <div className="flex items-center space-x-6">
                                {['tile2048', 'flip', 'shake', 'quiz'].map((game) => (
                                    <label key={game} className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            name={game}
                                            className="form-checkbox text-indigo-600 h-6 w-6" 
                                            checked={games[game as keyof Games]}
                                            onChange={handleInputChange}
                                        />
                                        <span className="ml-2 text-lg">{game.charAt(0).toUpperCase() + game.slice(1)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end mb-4">
                            <button 
                                type="submit" 
                                className="px-8 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            >
                                Create Campaign
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BrandCreateCampaign;
