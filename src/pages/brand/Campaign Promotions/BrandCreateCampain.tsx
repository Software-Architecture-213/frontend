import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandApi } from '../../../api/brandClient/brandApi';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useAuth } from '../../../hooks/AuthContext';

const paypalInitOptions = {
  clientId: 'AZzuAb3tlCCoHK_VNvLp0UAJZ7279cB4eXJcSFAfO1GiwzD_ZaHTa9w7i3t7l1HAtJj8kG9l6SuK2B50',
  components: "buttons",
  "disable-funding": ["credit", "card"],
  currency: "USD",
  "buyer-country": "US",
};

const BrandCreateCampaign = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  // Form state
  const [campaignName, setCampaignName] = useState('Nhập tên chiến dịch khuyến mãi');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("INACTIVE");
  const [budget, setBudget] = useState(0);
  const [cost, setCost] = useState(350);


  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === 'file') {
      setImage(target.files ? target.files[0] : null);
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

      setCost(budget);
    }

  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedStartDate = new Date(startDate).toISOString();
    const formattedEndDate = new Date(endDate).toISOString();

    const data = {
      name: campaignName,
      description,
      imageUrl: image,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      budget,
      status,
    };

    try {
      const response = await brandApi.createCampaignPromotions(data);
      console.log('Campaign created successfully:', response.data);
      navigate('/brand/campaign');
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
                onClick={() => setImage(null)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          )}
        </div>
        <div className="w-2/3 p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="campaignName" className="block text-md font-semibold text-gray-800 mb-2">Name of Campaign *</label>
              <input
                type="text"
                id="campaignName"
                name="campaignName"
                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
                value={campaignName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-md font-semibold text-gray-800 mb-2">Description *</label>
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
            <div className="mb-6">
              <label htmlFor="budget" className="block text-md font-semibold text-gray-800 mb-2">Budget *</label>
              <input
                type="number"
                id="budget"
                name="budget"
                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
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
                      style={{
                        layout: "vertical",
                        shape: "rect",
                        color: "gold",
                        label: "paypal",
                      }}
                      createOrder={async () => {
                        try {
                          const response = await fetch("http://localhost:8082/brands/checkout", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              id: auth.profile?.id,
                              price: cost.toString(),
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
                      }}
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
                              setStatus("PAID");
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
              className="w-full h-12 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700"
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