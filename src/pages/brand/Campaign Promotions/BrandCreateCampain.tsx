import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandApi } from '../../../api/brandClient/brandApi';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const paypalInitOptions = {
  clientId: 'AZzuAb3tlCCoHK_VNvLp0UAJZ7279cB4eXJcSFAfO1GiwzD_ZaHTa9w7i3t7l1HAtJj8kG9l6SuK2B50',
  // "enable-funding": "venmo",
  components: "buttons",
  "disable-funding": ["credit", "card"],
  currency: "USD",
  "buyer-country": "US",
};

const BrandCreateCampaign = () => {
  const navigate = useNavigate();

  // Form state
  const [campaignName, setCampaignName] = useState('Chào mùa hè mới cùng Phúc Long');
  const [description, setDescription] = useState(''); // New description state
  const [voucherNumber, setVoucherNumber] = useState('1000');
  const [voucherExpirationDate, setVoucherExpirationDate] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [totalCost, setTotalCost] = useState(0); // Total cost state
  const [message, setMessage] = useState("");

  // Cost per voucher (example: $1 per voucher)
  const costPerVoucher = 1;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === 'file') {
      setImage(target.files ? target.files[0] : null);
    } else {
      const setter = {
        campaignName: setCampaignName,
        description: setDescription,
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

    // Update total cost if voucher number changes
    if (name === 'voucherNumber') {
      const voucherCount = parseInt(value) || 0;
      setTotalCost(voucherCount * costPerVoucher);
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
      numOfVouchers: voucherNumber,
      voucherExpirationDate,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      status: 'INACTIVE',
      category,
      imageUrl: image,
    };

    try {
      const response = await brandApi.createCampaignPromotions(data);
      console.log('Campaign created successfully:', response.data);
      navigate('/brand/campaigns');
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
            <div className="mb-6">
              <label htmlFor="voucherNumber" className="block text-md font-semibold text-gray-800 mb-2">Number of Vouchers *</label>
              <input
                type="text"
                id="voucherNumber"
                name="voucherNumber"
                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
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
                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
                value={voucherExpirationDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="category" className="block text-md font-semibold text-gray-800 mb-2">Category *</label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full h-12 text-lg border border-gray-300 rounded-lg shadow-sm px-4"
                value={category}
                onChange={handleInputChange}
              >
                <option>Food</option>
                <option>Drink</option>
                <option>Ship</option>
                <option>All</option>
              </select>
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

            {/* Total Cost */}
            <div className="mb-6 flex p-3">
              <p className="justify-start text-md font-semibold text-gray-800">Total Cost: ${totalCost}</p>
            </div>

            {/* PayPal Button */}
            <div className="flex space-x-6 mb-6">
              <div className="w-2/3 p-3 flex">
                <label htmlFor="paypal" className="justify-start font-semibold text-gray-800 mb-2">Payment method</label>
                <p className="text-red-500">{message}</p>
              </div>
              <div className="w-1/3">
                <div id="paypal-button-container" >
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
                              cart: [
                                {
                                  id: "1",
                                  quantity: "1",
                                },
                              ],
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
                          // Three cases to handle:
                          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                          //   (2) Other non-recoverable errors -> Show a failure message
                          //   (3) Successful transaction -> Show confirmation or thank you message

                          const errorDetail = orderData?.details?.[0];

                          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                            return actions.restart();
                          } else if (errorDetail) {
                            // (2) Other non-recoverable errors -> Show a failure message
                            throw new Error(
                              `${errorDetail.description} (${orderData.debug_id})`
                            );
                          } else {
                            // (3) Successful transaction -> Show confirmation or thank you message
                            // Or go to another URL:  actions.redirect('thank_you.html');
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
                          }
                        } catch (error) {
                          console.error(error);
                          setMessage(
                            `Sorry, your transaction could not be processed...${error}`
                          );
                        }
                      }}
                    >

                    </PayPalButtons>
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
