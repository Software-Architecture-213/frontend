import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandApi } from '../../../api/brandClient/brandApi';
import imageCompression from 'browser-image-compression';
import { useAuth } from '../../../hooks/AuthContext';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import GameDialog from './CampaignGameDialog';
import { gameApi } from '../../../api/gameClient/gameApi';
import { v4 as uuidv4 } from 'uuid';

const paypalInitOptions = {
  clientId: 'AZzuAb3tlCCoHK_VNvLp0UAJZ7279cB4eXJcSFAfO1GiwzD_ZaHTa9w7i3t7l1HAtJj8kG9l6SuK2B50',
  components: "buttons",
  "disable-funding": ["credit", "card"],
  currency: "USD",
  "buyer-country": "US",
};

// Games selection state
type Games = {
  [key: string]: { id: string | null; selected: boolean; quizList?: any[]; item?: any[] };
};

const BrandCreateCampaign = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  // Form state
  const [promotionId, setPromotionId] = useState<string>('');
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("INACTIVE");
  const [budget, setBudget] = useState(0);
  // const [promotionId, setPromotionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [games, setGames] = useState<Games>({
    SHAKE: { id: null, selected: false, item: [] },
    QUIZ: { id: null, selected: false, quizList: [], item: [] },
  });
  const [openDialogs, setOpenDialogs] = useState<{ [key: string]: boolean }>({});
  
  useEffect(() => {
    const generatedId = uuidv4();
    setPromotionId(generatedId);
  }, []);
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setGames((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        selected: checked,
      },
    }));

    setOpenDialogs((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Close individual dialog
  const closeDialog = (gameType: string) => {
    setOpenDialogs((prev) => ({
      ...prev,
      [gameType]: false,
    }));
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === 'file') {
      handleFileChange(e);  // Call handleFileChange for file input
    } else if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      const { checked } = target;
      setGames((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          selected: checked,
        },
      }));
    } else {
      const setters: { [key: string]: React.Dispatch<React.SetStateAction<any>> } = {
        campaignName: setCampaignName,
        description: setDescription,
        startDate: setStartDate,
        endDate: setEndDate,
        budget: setBudget,
      };
      const setter = setters[name];
      if (setter) {
        setter(value);
      }
    }
  };

  // Handle file change for image preview and compression
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

  // Handle form submission (without image initially)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedStartDate = new Date(startDate).toISOString();
    const formattedEndDate = new Date(endDate).toISOString();
    const selectedGames = Object.entries(games)
    .filter(([_, value]) => value.selected && value.id)
    .map(([_, value]) => value.id);

    const data = {
      id: promotionId,
      name: campaignName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      budget,
      status,
      games: selectedGames,
    };

    try {
      // Send initial data to backend
      const response = await brandApi.createCampaignPromotions(data);
      console.log('Campaign created successfully:', response.data);
      console.log('Promotion ID:', response.data.id.toString());

      // Once campaign is created, handle image upload (if any)
      if (image) {
        await uploadImage(response.data.id);
      }

      navigate('/brand/campaign');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const createGame = async (gameType: string, gameDetails: any, quizList: any, itemList: any) => {
    try {
      gameDetails.type = gameType.toLowerCase();

      const updatedItemList = itemList.map((item: any) => ({
        ...item,
        tradable: item.tradable === "on" ? true : item.tradable === "off" ? false : item.tradable,
      }));

      const game = {
        promotionId: promotionId,
        brandId: auth.profile?.id,
        campaignName,
        ...gameDetails,
      };

      if (gameType === 'QUIZ' && quizList) {
        const payload = {
          game,
          quizquestions: quizList,
          items: updatedItemList,
        }
        const response = await gameApi.createGame(payload);
        console.log(`Game ${gameType} created successfully:`, response);
        setGames((prev) => ({
          ...prev,
          [gameType]: {
            ...prev[gameType],
            id: response.data.data.game.id,
          },
        }));
        
        console.log("Quiz payload: ", payload)
      } else {
        const payload = {
          game,
          items: updatedItemList,
        }
        const response = await gameApi.createGame(payload); // Call the API
        console.log(`Game ${gameType} created successfully:`, response);
        setGames((prev) => ({
          ...prev,
          [gameType]: {
            ...prev[gameType],
            id: response.data.data.game.id,
          },
        }));
        console.log("Shake payload: ", payload)
      }
      
      // Close dialog after success
      closeDialog(gameType);
    } catch (error) {
      console.error(`Error creating game ${gameType}:`, error);
    }
  };

  // Function to handle image upload
  const uploadImage = async (promotionId: string) => {
    const formData = new FormData();
    formData.append('image', image!);  // Assuming image is never null when uploading

    setIsLoading(true);

    try {
      const response = await brandApi.uploadImage(image!, promotionId, 'promotions');
      console.log('Image uploaded successfully:', response.data);
      // Handle the response after image upload
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      {isLoading ? (
        <p> Uploading image...</p>
      ) : (
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
                <div className="mb-6">
                  <label htmlFor="campaignName" className="block text-md font-semibold text-black  mb-2">Name of Campaign *</label>
                  <input
                    type="text"
                    placeholder='Enter name...'
                    id="campaignName"
                    name="campaignName"
                    className="bg-white text-black mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
                    value={campaignName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="description" className="block text-md font-semibold text-gray-800 mb-2">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                      className="bg-white text-black mt-1 block w-full text-lg border border-gray-300 rounded-lg shadow-sm px-4"
                    value={description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="flex space-x-6 mb-6">
                  <div className="w-1/2">
                    <label htmlFor="startDate" className="block text-md font-semibold text-gray-800 mb-2">Start Date *</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
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
                      className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
                      value={endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-6 text-black">
                  <p className="text-md font-semibold text-gray-800 mb-2">Choose games *</p>
                  <div className="flex items-center space-x-6">
                    {['SHAKE', 'QUIZ'].map((game) => (
                      <label key={game} className="flex items-center">
                        <input
                          type="checkbox"
                          name={game}
                          className="form-checkbox text-indigo-600 h-6 w-6"
                          checked={games[game].selected}
                          onChange={handleCheckboxChange}
                        />
                        <span className="ml-2 text-lg">{game.slice(0, 1) + game.slice(1).toLowerCase()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Render Game Dialogs */}
                {Object.keys(openDialogs).map(
                  (gameType) =>
                    openDialogs[gameType] && (
                      <GameDialog
                        key={gameType}
                        isOpen={openDialogs[gameType]}
                        initialGameType={gameType}
                        onClose={() => closeDialog(gameType)}
                        onSave={(gameDetails: any, quizList: any, itemList: any) => createGame(gameType, gameDetails, quizList, itemList)}
                      />
                    )
                )}
                <div className="mb-6">
                  <label htmlFor="budget" className="block text-md font-semibold text-gray-800 mb-2">Budget *</label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                      className="bg-white text-black mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
                    value={budget}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-6 flex p-3">
                  <p className="justify-start text-md font-semibold text-gray-800">Message: {message}</p>
                </div>

                {/* PayPal Button */}
                <div className="flex space-x-6 mb-6">
                  <div className="w-2/3 p-3 flex">
                    <label htmlFor="paypal" className="justify-start font-semibold text-gray-800 mb-2">Payment method</label>
                  </div>
                  <div className="w-1/3">
                    <div id="paypal-button-container">
                      <PayPalScriptProvider options={paypalInitOptions}>
                        <PayPalButtons
                          forceReRender={[budget]}
                          style={{
                            layout: "vertical",
                            shape: "rect",
                            color: "gold",
                            label: "paypal",
                          }}
                          createOrder={
                            async () => {
                              try {
                                const response = await fetch("http://localhost:8082/brands/checkout", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    id: auth.profile?.id,
                                    price: budget.toString(),
                                  }),
                                });
                                const orderData = await response.json();

                                if (orderData.id) {
                                  return orderData.id;
                                } else {
                                  const errorDetail = orderData?.details?.[0];
                                  const errorMessage = errorDetail
                                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                    : JSON.stringify(orderData);

                                  throw new Error(errorMessage);
                                }
                              } catch (error) {
                                console.error(error);
                                setMessage(`Could not initiate PayPal Checkout...${error}`);
                              }
                            }
                          }
                          onApprove={async (data, actions) => {
                            try {
                              const response = await fetch(
                                `http://localhost:8082/brands/checkout/${data.orderID}/capture`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                }
                              );

                              const orderData = await response.json();
                              const errorDetail = orderData?.details?.[0];

                              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                return actions.restart();
                              } else if (errorDetail) {
                                throw new Error(
                                  `${errorDetail.description} (${orderData.debug_id})`
                                );
                              } else {
                                const transaction =
                                  orderData.purchase_units[0].payments.captures[0];
                                setMessage(
                                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                                );
                                console.log(
                                  "Capture result",
                                  orderData,
                                  JSON.stringify(orderData, null, 2)
                                );
                                if (orderData.status === "COMPLETED") {
                                  setMessage("Transaction completed by " + orderData.payer.name.given_name + orderData.payer.name.surname);
                                  setStatus("ACTIVE");
                                }
                              }
                            } catch (error) {
                              console.error(error);
                              setMessage(
                                `Sorry, your transaction could not be processed...${error}`
                              );
                            }
                          }}
                        />
                      </PayPalScriptProvider>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-orange-300 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-600"
                >
                  Create Campaign
                </button>
              </form>
            </div>
          </div>
        </div>

      )}
    </div>
  )
};
export default BrandCreateCampaign;

